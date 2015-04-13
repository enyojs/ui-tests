var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/TimePicker/GT-11134-MerediemLoops',
	title = 'TimePicker: Meridiem Loops upon Hour Picker\'s action',
	tags = ['sample'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should loop meridiem display from AM to PM.', function (done) {
		browser
				.setWindowSize(1920,1280)
				.get(url)
				.waitForElementById(app.hourPickerID)
				.execute('enyo.$["app"].set("value", new Date("Mar 08 2015 12:34 AM"));')
				.elementById(app.hourPickerID)
				.click()
				.waitForElementById(app.hourDownArrowID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
				.execute(app.getVisibleScrollerText, [app.meridiemPickerID]).should.eventually.equal('pm')

				.nodeify(done);
	});
});

app = {
	meridiemPickerID: 'app_pickerTime_meridiem',
	hourPickerID: 'app_pickerTime',
	hourDownArrowID: 'app_pickerTime_hour_previousOverlay',
	getVisibleScrollerText: "return (function (pickerId) {" +
		"var c = enyo.$[pickerId]," +
		"	scroller = c.$.scroller," +
		"	scrollTop = scroller.scrollTop;" +
		"var visible = Array.prototype.filter.call(scroller.node.querySelectorAll('.moon-scroll-picker-item'), function (node) { return node.offsetTop === scrollTop; })[0];" +
		"return visible && visible.textContent;" +
		"})(arguments[0]);"
};

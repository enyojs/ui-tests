var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/TimePicker/GT-14597-ZeroHourDisplays',
	title = 'TimePicker: \'0\' Hour Displays in 24 Hour Locale Format',
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

	it('should display \'0\' after passing the 23rd hour.', function (done) {
		browser
				.setWindowSize(1920,1280)
				.get(url)
				.waitForElementById(app.localePickerID)
				.elementById(app.localePickerID)
				.click()
				.waitForElementById(app.frLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
				.execute('return ilib.getLocale()').should.eventually.equal('fr-FR')
				.waitForElementById(app.localePickerID, helpers.wd.asserters.isDisplayed, 1000)

				.waitForElementById(app.timePickerID)
				.execute('enyo.$["app"].set("value", new Date("Mar 08 2015 23:59"));')
				.elementById(app.timePickerID)
				.click()
				.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
				.execute(app.getVisibleScrollerText, [app.hourPickerID]).should.eventually.equal('00')

				.nodeify(done);
	});

	it('should have \'0\' in the hour picker\'s \'value\' property.', function (done) {
		browser
				.setWindowSize(1920,1280)
				.get(url)
				.waitForElementById(app.localePickerID)
				.elementById(app.localePickerID)
				.click()
				.waitForElementById(app.frLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
				.execute('return ilib.getLocale()').should.eventually.equal('fr-FR')
				.waitForElementById(app.localePickerID, helpers.wd.asserters.isDisplayed, 1000)

				.waitForElementById(app.timePickerID)
				.execute('enyo.$["app"].set("value", new Date("Mar 08 2015 23:59"));')
				.elementById(app.timePickerID)
				.click()
				.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
				.execute('return enyo.$["app"].get("value").getHours()').should.eventually.equal(0)

				.nodeify(done);
	});

});

app = {
	timePickerID: 'app_pickerTime',
	hourPickerID: 'app_pickerTime_hour',
	hourUpArrowID: 'app_pickerTime_hour_nextOverlay',
	localePickerID: 'app_pickerLocale',
	frLocaleCheckboxID: 'app_checkboxItem2',
	getVisibleScrollerText: "return (function (pickerId) {" +
		"var c = enyo.$[pickerId]," +
		"	scroller = c.$.scroller," +
		"	scrollTop = scroller.scrollTop;" +
		"var visible = Array.prototype.filter.call(scroller.node.querySelectorAll('.moon-scroll-picker-item'), function (node) { return node.offsetTop === scrollTop; })[0];" +
		"return visible && visible.textContent;" +
		"})(arguments[0]);"

};


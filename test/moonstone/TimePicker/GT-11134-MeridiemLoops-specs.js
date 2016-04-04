var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/TimePicker/GT-11134-MeridiemLoops',
	title = 'GT-11134 - TimePicker: Meridiem Loops upon Hour Picker\'s action',
	tags = ['sample'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		helpers.epack(path, function(){
			browser = helpers.initBrowser(title, tags, base, path, done);
		});
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should loop meridiem display from AM to PM.', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get('ui-tests/dist')
			.waitForElementById(app.hourPickerID)
			.elementById(app.hourPickerID)
			.click()
			.delay(500)
			.waitForElementById(app.hourDownArrowID, helpers.wd.asserters.isDisplayed, 1000)
			.click()
			.delay(1000)
			.enyoPropertyGet(app.meridiemPickerID, 'content').should.eventually.equal('pm')
			.nodeify(done);
	});
});

app = {
	appId: 'gT-11134-MeridiemLoops',
	meridiemPickerID: 'gT-11134-MeridiemLoops_pickerTime_meridiem_item',
	hourPickerID: 'gT-11134-MeridiemLoops_pickerTime',
	hourDownArrowID: 'gT-11134-MeridiemLoops_pickerTime_hour_previousOverlay'
};

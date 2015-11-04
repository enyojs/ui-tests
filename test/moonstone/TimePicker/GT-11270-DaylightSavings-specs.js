var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/TimePicker/GT-11270-DaylightSavings',
	title = 'GT-11270 - Time Picker: Daylight Savings',
	tags = ['moonstone', 'qa', 'TimePicker'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		helpers.epack(path);
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('Should skip 2:00 when date is daylight savings', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get("ui-tests/dist")
			.waitForElementById(app.hourPickerID)
			.click()
			.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
			.click()
			.execute('dispatcher = require("enyo/dispatcher"); return dispatcher.$["'+app.appId+'"].get("value").getHours()').should.eventually.equal(3)
			.nodeify(done);
	});

});

app = {
	appId: "gT-11270-DaylightSavings",
	hourPickerID: 'gT-11270-DaylightSavings_pickerTimeLinked',
	hourUpArrowID: 'gT-11270-DaylightSavings_pickerTimeLinked_hour_nextOverlay'
};


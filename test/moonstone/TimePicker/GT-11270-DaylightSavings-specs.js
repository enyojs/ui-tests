var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/TimePicker/GT-11270-DaylightSavings',
	title = 'Time Picker: Daylight Savings',
	tags = ['moonstone', 'qa', 'TimePicker'];	// Tags show up in SauceLabs test output

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

	it('Should skip 2:00 when date is daylight savings', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.hourPickerID)
			// March 8, 2015 was the date of the daylight savings time change
			.execute('enyo.$["app"].set("value", new Date("Mar 08 2015 01:59"));')
			.elementById(app.hourPickerID)
				.click()
			.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return enyo.$["app"].get("value").getHours()').should.eventually.equal(3)
			.nodeify(done);
	});

});

app = {
	hourPickerID: 'app_pickerTimeLinked',
	hourUpArrowID: 'app_pickerTimeLinked_hour_nextOverlay'
};


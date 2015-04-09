var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/TimePicker/DoesNotLoop',
	title = 'Time Picker: Does Not Loop',
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

	it('Verifying the hour picker does not loop with the minute picker', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.hourPickerID)
			// March 8, 2015 was the date of the daylight savings time change
			.execute('enyo.$["app"].set("value", new Date("Mar 08 2015 01:59"));')
			.elementById(app.timePickerID)
				.click()
			.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return enyo.$["app"].get("value").getHours()').should.eventually.equal(3)
			.waitForElementById(app.app_pickerTimeLinked_minute_nextOverlay, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.waitForElementById(app.app_pickerTimeLinked_minute_nextOverlay, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.waitForElementById(app.app_pickerTimeLinked_minute_nextOverlay, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return enyo.$["app"].get("value").getHours()').should.eventually.equal(3)
			.nodeify(done);
	});

});

app = {
	timePickerID: 'app_pickerTimeLinked',
	hourUpArrowID: 'app_pickerTimeLinked_hour_nextOverlay',
	minuteUpArrowID: 'app_pickerTimeLinked_minute_nextOverlay'
};

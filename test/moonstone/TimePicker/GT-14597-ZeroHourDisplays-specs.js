var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/TimePicker/GT-14597-ZeroHourDisplays',
	title = 'GT-14597 - TimePicker: \'0\' Hour Displays in 24 Hour Locale Format',
	directory = 'ui-tests/dist',
	tags = ['sample'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should display \'0\' after passing the 23rd hour.', function (done) {
		browser
				.setWindowSize(1920,1280)
				.get(directory)
				.waitForElementById(app.localePickerID)
				.elementById(app.localePickerID)
				.click()
				.waitForElementById(app.frLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.delay(250)
				.click()
				.execute('ilib = require("enyo-ilib"); return ilib.getLocale()').should.eventually.equal('fr-FR')
				.waitForElementById(app.localePickerID, helpers.wd.asserters.isDisplayed, 1000)
				.elementById(app.timePickerID)
				.click()
				.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
				.delay(800)
				.elementById(app.hourPickerID)
				.enyoGetVisibleScrollerText().should.eventually.equal('00')
				.nodeify(done);
	});

	it('should have \'0\' in the hour picker\'s \'value\' property.', function (done) {
		browser
				.setWindowSize(1920,1280)
				.get(directory)
				.waitForElementById(app.localePickerID)
				.elementById(app.localePickerID)
				.click()
				.waitForElementById(app.frLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.delay(250)
				.click()
				.execute('ilib = require("enyo-ilib"); return ilib.getLocale()').should.eventually.equal('fr-FR')
				.waitForElementById(app.localePickerID, helpers.wd.asserters.isDisplayed, 1000)
				.elementById(app.timePickerID)
				.click()
				.waitForElementById(app.hourUpArrowID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
				.delay(800)
				.execute('dispatcher = require("enyo/dispatcher"); return dispatcher.$["'+app.appId+'"].get("value").getHours()').should.eventually.equal(0)
				.nodeify(done);
	});

});

app = {
	appId: 'gT-14597-ZeroHourDisplays',
	timePickerID: 'gT-14597-ZeroHourDisplays_pickerTime',
	hourPickerID: 'gT-14597-ZeroHourDisplays_pickerTime_hour',
	hourNumberID: 'gT-14597-ZeroHourDisplays_pickerTime_hour_item',
	hourUpArrowID: 'gT-14597-ZeroHourDisplays_pickerTime_hour_nextOverlay',
	localePickerID: 'gT-14597-ZeroHourDisplays_pickerLocale',
	frLocaleCheckboxID: 'gT-14597-ZeroHourDisplays_checkboxItem2'
};
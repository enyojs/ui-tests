var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/TimePicker/DefaultLocale',
	title = 'Time Picker: Default Locale',
	tags = ['sample'];	// Tags show up in SauceLabs test output

// should not be necessary. But if I don't do this I get an error of 'ReferenceError: lastValue is not defined'
lastValue= '1:59am';

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

	it('Should display Default Locale after a reset of the locale', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.timePickerCurrentValueID)
			.enyoPropertyGet(app.timePickerCurrentValueID, 'content').then(function(value) {lastValue = value; return browser; })
			.waitForElementById(app.localePickerID)
			.elementById(app.localePickerID)
				.click()
			.waitForElementById(app.jpLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return ilib.getLocale()').should.eventually.equal('jp-JP')
			.enyoPropertyGet(app.timePickerCurrentValueID, 'content').should.eventually.not.equal(lastValue, "shouldn't match original value")
			.waitForElementById(app.localePickerID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.waitForElementById(app.defaultLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return ilib.getLocale()').should.eventually.equal(app.defaultLocale)
			.enyoPropertyGet(app.timePickerCurrentValueID, 'content').should.eventually.equal(lastValue, "should match original value")
			.nodeify(done);
	});

});

app = {
	timePickerCurrentValueID: 'app_pickerTimeLinked_currentValue',
	localePickerID: 'app_pickerLocale',
	defaultLocaleCheckboxID: 'app_checkboxItem',
	jpLocaleCheckboxID: 'app_checkboxItem2',
	defaultLocale: 'en-US'
};


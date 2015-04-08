var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/TimePicker/Default Locale',
	title = 'Time Picker: Default Locale',
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

	it('Should display Default Locale after a reset of the locale', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.localePickerID)
			.elementById(app.localePickerID)
				.click()
			.waitForElementById(app.jpLocaleID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return ilib.getLocale()').should.eventually.equal('jp-JP')
			.waitForElementById(app.localePickerID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.waitForElementById(defaultLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return ilib.getLocale()').should.eventually.equal(app.defaultLocale)
			.nodeify(done);
	});

});

app = {
	localePickerID: 'app_pickerLocal',
	defaultLocaleCheckboxID: 'app_checkboxItem',
	jpLocaleCheckboxID: 'app_checkboxItem2',
	defaultLocale: 'en-US'
};


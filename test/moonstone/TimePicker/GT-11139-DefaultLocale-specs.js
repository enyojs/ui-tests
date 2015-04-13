var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/TimePicker/GT-11139-DefaultLocale',
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
			.waitForElementById(app.timePickerCurrentValueID)
			.elementById(app.localePickerID)
				.click()
			.waitForElementById(app.jpLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return ilib.getLocale()').should.eventually.equal('jp-JP')
			.enyoPropertyGet(app.timePickerCurrentValueID, 'content').should.eventually.not.equal(app.defaultCurrentValue, "shouldn't match original value")
			.waitForElementById(app.localePickerID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.waitForElementById(app.defaultLocaleCheckboxID, helpers.wd.asserters.isDisplayed, 1000)
				.click()
			.execute('return ilib.getLocale()').should.eventually.equal(app.defaultLocale)
			.enyoPropertyGet(app.timePickerCurrentValueID, 'content').should.eventually.equal(app.defaultCurrentValue, "should match original value")
			.nodeify(done);
	});

});

app = {
	timePickerCurrentValueID: 'app_pickerTimeLinked_currentValue',
	localePickerID: 'app_pickerLocale',
	defaultLocaleCheckboxID: 'app_checkboxItem',
	jpLocaleCheckboxID: 'app_checkboxItem2',
	defaultLocale: 'en-US',
	
	// should not be necessary. But so far, trying to store the initial currentValue results in an
	// error of 'ReferenceError: currentValue is not defined'
	defaultCurrentValue: '1:59am'
};


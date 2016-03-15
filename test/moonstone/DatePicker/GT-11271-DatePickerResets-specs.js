var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-11271-DatePickerResets',
	title = 'GT-11271 - DatePicker: \'Reset Date\' resets Picker',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DatePicker'];	// Tags show up in SauceLabs test output

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

	it('should reset date when reset button is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.headerText)			
			.elementById(app.headerText)
			.click()
			.delay(1000)
			.elementById(app.monthPicker)
			.enyoGetVisibleScrollerText().should.eventually.equal('10')
			.elementById(app.dayPicker)
			.enyoGetVisibleScrollerText().should.eventually.equal('1')
			.elementById(app.yearPicker)
			.enyoGetVisibleScrollerText().should.eventually.equal('2015')
			.elementById(app.headerText)
			.click()
			.text().should.eventually.contain('Thursday, October 1, 2015')
			.elementById(app.resetButton)
			.click()
			.elementById(app.headerText)
			.text().should.eventually.contain('Pick a Date')
			.nodeify(done);
	});

});

app = {
	headerText: 'gT-11271-DatePickerResets_picker_header_text',
	monthPicker: 'gT-11271-DatePickerResets_picker_month',
	dayPicker: 'gT-11271-DatePickerResets_picker_day',
	yearPicker: 'gT-11271-DatePickerResets_picker_year',
	resetButton: 'gT-11271-DatePickerResets_buttonReset_client'
};
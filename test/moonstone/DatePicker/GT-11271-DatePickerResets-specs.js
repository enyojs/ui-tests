var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-11271-DatePickerResets',
	title = 'DatePicker: \'Reset Date\' resets Picker',
	directory = 'ui-tests/dist',
	tags = ["moonstone","qa","DatePicker"];	// Tags show up in SauceLabs test output

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
			.getTopElementText().should.eventually.equal('10')
			.elementById(app.dayPicker)
			.getTopElementText().should.eventually.equal('1')
			.elementById(app.yearPicker)
			.getTopElementText().should.eventually.equal('2015')
			.elementById(app.headerText)
			.click()
			.text().should.eventually.equal('Thursday, October 1, 2015')
			.elementById(app.resetButton)
			.click()
			.elementById(app.headerText)
			.text().should.eventually.equal('Pick a Date')
			.nodeify(done);
	});

});

app = {
	headerText: 'gT-11271-DatePickerResets_picker_header_text',
	monthPicker: 'gT-11271-DatePickerResets_picker_month_scroller',
	dayPicker: 'gT-11271-DatePickerResets_picker_day_scroller',
	yearPicker: 'gT-11271-DatePickerResets_picker_year_scroller',
	resetButton: 'gT-11271-DatePickerResets_buttonReset_client'
};

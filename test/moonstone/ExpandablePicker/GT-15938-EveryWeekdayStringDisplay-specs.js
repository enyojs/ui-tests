var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandablePicker/GT-15938-EveryWeekendStringDisplay',
	title = 'GT-15938 - DayPicker: \'Every Weekend\' String Displays',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DayPicker'];	// Tags show up in SauceLabs test output

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

	it('should display \'Every Weekend\' when all weekdays are checked' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.dayPicker)
			.click()
			.delay(500)
			.elementById(app.dayPicker)
			.getClasses().should.eventually.contain('open')
			.elementById(app.sundayId)
			.click()
			.delay(500)
			.elementById(app.saturdayId)
			.click()
			.delay(500)
			.elementById(app.dayPickerHeader)
			.click()
			.delay(500)
			.elementById(app.currentValueString)
			.text().should.eventually.contain('Every Weekend')
			.elementById(app.headerText)
			.text().should.eventually.contain('Every Weekend')
			.nodeify(done);
	});

});

app = {
	dayPicker: 'gT-15938-EveryWeekendStringDisplay_dayPicker',
	dayPickerHeader: 'gT-15938-EveryWeekendStringDisplay_dayPicker_header_header',
	headerText: 'gT-15938-EveryWeekendStringDisplay_dayPicker_header_text',
	sundayId: 'gT-15938-EveryWeekendStringDisplay_dayPicker_checkboxItem',
	saturdayId: 'gT-15938-EveryWeekendStringDisplay_dayPicker_checkboxItem7',
	currentValueString: 'gT-15938-EveryWeekendStringDisplay_nonGroupedPanel_header_subTitleBelow'
};

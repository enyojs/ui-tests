var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandablePicker/GT-15940-EveryDayStringDisplay',
	title = 'GT-15940 - DayPicker: \'Every Day\' String Displays',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'DayPicker'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		helpers.epack(path, function(){
			browser = helpers.initBrowser(title, tags, base, path, done);
		});
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should display \'Every Day\' when all days are checked', function (done) {
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
			.elementById(app.mondayId)
			.click()
			.delay(500)
			.elementById(app.tuesdayId)
			.click()
			.delay(500)
			.elementById(app.wednesdayId)
			.click()
			.delay(500)
			.elementById(app.thursdayId)
			.click()
			.delay(500)
			.elementById(app.fridayId)
			.click()
			.delay(500)
			.elementById(app.saturdayId)
			.click()
			.delay(500)
			.elementById(app.dayPickerHeader)
			.click()
			.delay(500)
			.elementById(app.currentValueString)
			.text().should.eventually.contain('Every Day')
			.elementById(app.headerText)
			.text().should.eventually.contain('Every Day')
			.nodeify(done);
	});

});

app = {
	dayPicker: 'gT-15940-EveryDayStringDisplay_dayPicker',
	dayPickerHeader: 'gT-15940-EveryDayStringDisplay_dayPicker_header_header',
	headerText: 'gT-15940-EveryDayStringDisplay_dayPicker_header_text',
	sundayId: 'gT-15940-EveryDayStringDisplay_dayPicker_checkboxItem',
	mondayId: 'gT-15940-EveryDayStringDisplay_dayPicker_checkboxItem2',
	tuesdayId: 'gT-15940-EveryDayStringDisplay_dayPicker_checkboxItem3',
	wednesdayId: 'gT-15940-EveryDayStringDisplay_dayPicker_checkboxItem4',
	thursdayId: 'gT-15940-EveryDayStringDisplay_dayPicker_checkboxItem5',
	fridayId: 'gT-15940-EveryDayStringDisplay_dayPicker_checkboxItem6',
	saturdayId: 'gT-15940-EveryDayStringDisplay_dayPicker_checkboxItem7',
	currentValueString: 'gT-15940-EveryDayStringDisplay_nonGroupedPanel_header_subTitleBelow'
};
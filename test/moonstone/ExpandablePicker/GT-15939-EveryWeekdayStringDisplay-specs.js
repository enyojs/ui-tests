var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandablePicker/GT-15939-EveryWeekdayStringDisplay',
	title = 'GT-15939 - DayPicker: \'Every Weekday\' String Displays',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DayPicker'];	// Tags show up in SauceLabs test output

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

	it('should display \'Every Weekday\' when all weekdays are checked' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.dayPicker)
			.click()
			.delay(1000)
			.elementById(app.dayPicker)
			.getClasses().should.eventually.contain('open')
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
			.elementById(app.dayPickerHeader)
			.click()
			.delay(500)
			.elementById(app.currentValueString)
			.text().should.eventually.contain('Every Weekday')
			.elementById(app.headerText)
			.text().should.eventually.contain('Every Weekday')
			.nodeify(done);
	});

});

app = {
	dayPicker: 'gT-15939-EveryWeekdayStringDisplay_dayPicker',
	dayPickerHeader: 'gT-15939-EveryWeekdayStringDisplay_dayPicker_header_header',
	headerText: 'gT-15939-EveryWeekdayStringDisplay_dayPicker_header_text',
	mondayId: 'gT-15939-EveryWeekdayStringDisplay_dayPicker_checkboxItem2',
	tuesdayId: 'gT-15939-EveryWeekdayStringDisplay_dayPicker_checkboxItem3',
	wednesdayId: 'gT-15939-EveryWeekdayStringDisplay_dayPicker_checkboxItem4',
	thursdayId: 'gT-15939-EveryWeekdayStringDisplay_dayPicker_checkboxItem5',
	fridayId: 'gT-15939-EveryWeekdayStringDisplay_dayPicker_checkboxItem6',
	currentValueString: 'gT-15939-EveryWeekdayStringDisplay_nonGroupedPanel_header_subTitleBelow'
};

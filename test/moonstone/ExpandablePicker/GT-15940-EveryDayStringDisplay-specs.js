var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/ExpandablePicker/GT-15940-EveryDayStringDisplay',
	title = 'DayPicker: "Every Day" String Displays',
	tags = ['moonstone', 'qa', 'DayPicker'];	// Tags show up in SauceLabs test output

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

	it('should display "Every Day" when all days are checked', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.dayPicker)
			.click()
			.delay(500)
			.waitForElementById(app.sundayId)
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
			.elementById(app.dayPicker)
			.click()
			.delay(500)
			.elementById(app.currentValueString)
			.text().should.eventually.equal("Every Day")
			.nodeify(done);
	});

});

app = {
	dayPicker: "app_dayPicker_headerWrapper",
	sundayId: "app_dayPicker_checkboxItem",
	mondayId: "app_dayPicker_checkboxItem2",
	tuesdayId: "app_dayPicker_checkboxItem3",
	wednesdayId: "app_dayPicker_checkboxItem4",
	thursdayId: "app_dayPicker_checkboxItem5",
	fridayId: "app_dayPicker_checkboxItem6",
	saturdayId: "app_dayPicker_checkboxItem7",
	currentValueString: "app_dayPicker_currentValue"
};


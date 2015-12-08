var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandablePicker/GT-15936-DayPickerRemainsExpanded',
	title = 'GT-15936 - DayPicker: Picker remains Expanded upon Selection',
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

	it('should remain expanded when days are selected' , function (done) {
		 browser
            .setWindowSize(1920, 1280)
            .get(directory)
            .waitForElementById(app.dayPickerHeader)
            .click()
            .delay(1000)
            .elementById(app.dayPicker)
            .getClasses().should.eventually.contain('open')
            .elementById(app.mondayId)
            .click()
            .delay(500)
            .elementById(app.wednesdayId)
            .click()
            .delay(500)
            .elementById(app.saturdayId)
            .click()
            .elementById(app.dayPicker)
            .getClasses().should.eventually.contain('open')
            .elementById(app.currentValueString)
            .text().should.eventually.contain('Mon, Wed, Sat')
            .nodeify(done);
    });
});

app = {
    dayPicker: 'gT-15936-DayPickerRemainsExpanded_dayPicker',
    dayPickerHeader: 'gT-15936-DayPickerRemainsExpanded_dayPicker_header_header',
    mondayId: 'gT-15936-DayPickerRemainsExpanded_dayPicker_checkboxItem2',
    wednesdayId: 'gT-15936-DayPickerRemainsExpanded_dayPicker_checkboxItem4',
    saturdayId: 'gT-15936-DayPickerRemainsExpanded_dayPicker_checkboxItem7',
    currentValueString: 'gT-15936-DayPickerRemainsExpanded_nonGroupedPanel_header_subTitleBelow'
};
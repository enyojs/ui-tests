var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-11194-ActiveDayChanges',
	title = 'GT-11194 - DatePicker: Active \'Day\' changes display in Open State',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DatePicker'];	// Tags show up in SauceLabs test output

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

	it('should change day string when changed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.datePicker)
			.click()
			.delay(1000)
			.elementById(app.headerText)
			.text().should.eventually.contain('Thursday, October 1, 2015')
			.elementById(app.pickerDay)
			.enyoGetVisibleScrollerText().should.eventually.equal('1')
			.elementById(app.dayUp)
			.click()
			.delay(1000)
			.elementById(app.headerText)
			.text().should.eventually.contain('Friday, October 2, 2015')
			.elementById(app.pickerDay)
			.enyoGetVisibleScrollerText().should.eventually.equal('2')
			.nodeify(done);
	});

});

app = {
	datePicker: 'gT-11194-ActiveDayChanges_picker',
	dayUp: 'gT-11194-ActiveDayChanges_picker_day_control2',
	headerText: 'gT-11194-ActiveDayChanges_picker_header_text',
	pickerDay: 'gT-11194-ActiveDayChanges_picker_day'
};
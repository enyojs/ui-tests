var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-11153-ActiveYearChanges',
	title = 'GT-11153 - DatePicker: Active \'Year\' changes display in Open State',
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

	it('should change year string when changed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.moveTo(0,0)
			.moveTo()
			.waitForElementById(app.datePicker)
			.click()
			.delay(1000)
			.elementById(app.headerText)
			.text().should.eventually.contain('Thursday, October 1, 2015')
			.elementById(app.yearClient)
			.enyoGetVisibleScrollerText().should.eventually.equal('2015')
			.elementById(app.yearUp)
			.click()
			.delay(1000)
			.elementById(app.headerText)
			.text().should.eventually.contain('Saturday, October 1, 2016')
			.elementById(app.yearClient)
			.enyoGetVisibleScrollerText().should.eventually.equal('2016')
			.nodeify(done);
	});

});
app = {
	appId: 'gT-11153-ActiveYearChanges',
	datePicker: 'gT-11153-ActiveYearChanges_picker',
	yearUp: 'gT-11153-ActiveYearChanges_picker_year_control2',
	headerText: 'gT-11153-ActiveYearChanges_picker_header_text',
	yearClient: 'gT-11153-ActiveYearChanges_picker_year'
};
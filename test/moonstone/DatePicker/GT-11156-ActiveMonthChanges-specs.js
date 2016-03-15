var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-11156-ActiveMonthChanges',
	title = 'GT-11156 - DatePicker: Active \'Month\' changes display in Open State',
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

	it('should change month string when changed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.datePicker)
			.click()
			.delay(1000)
			.elementById(app.headerText)
			.text().should.eventually.contain('Thursday, October 1, 2015')
			.elementById(app.monthClient)
			.enyoGetVisibleScrollerText().should.eventually.equal('10')
			.elementById(app.monthUp)
			.click()
			.delay(1000)
			.elementById(app.headerText)
			.text().should.eventually.contain('Sunday, November 1, 2015')
			.elementById(app.monthClient)
			.enyoGetVisibleScrollerText().should.eventually.equal('11')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-11156-ActiveMonthChanges',
	datePicker: 'gT-11156-ActiveMonthChanges_picker',
	monthUp: 'gT-11156-ActiveMonthChanges_picker_month_control2',
	headerText: 'gT-11156-ActiveMonthChanges_picker_header_text',
	monthClient: 'gT-11156-ActiveMonthChanges_picker_month'
};
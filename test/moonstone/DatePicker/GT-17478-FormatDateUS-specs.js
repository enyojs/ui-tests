var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-17478-FormatDateUS',
	title = 'GT-17478 - DatePicker: \'MDY\' Format Displays for en-US Locale',
	directory = 'ui-tests/dist',
	tags = ['moonstone','datepicker','qa','locale'];	// Tags show up in SauceLabs test output

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

	it('should display date as \'MDY\'' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory + '/#en-US')
			.waitForElementById(app.appId)
			.execute('ilib = require("enyo-ilib"); return ilib.getLocale()').should.eventually.equal('en-US')
			.elementById(app.datePickerId)
			.click()
			//Month First
			.elementById(app.monthLabel)
			.enyoGetParentElementId().should.eventually.equal(app.firstItem)
			//Day Second
			.elementById(app.dayLabel)
			.enyoGetParentElementId().should.eventually.equal(app.secondItem)
			//Year Last
			.elementById(app.yearLabel)
			.enyoGetParentElementId().should.eventually.equal(app.thirdItem)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-17478-FormatDateUS',
	datePickerId: 'gT-17478-FormatDateUS_picker',
	yearLabel: 'gT-17478-FormatDateUS_picker_yearLabel',
	monthLabel: 'gT-17478-FormatDateUS_picker_monthLabel',
	dayLabel: 'gT-17478-FormatDateUS_picker_dayLabel',
	firstItem: 'gT-17478-FormatDateUS_picker_control',
	secondItem: 'gT-17478-FormatDateUS_picker_control2',
	thirdItem: 'gT-17478-FormatDateUS_picker_control3'
};
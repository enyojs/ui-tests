var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-17477-FormatDateES',
	title = 'GT-17477 - DatePicker: \'DMY\' Format Displays for en-ES Locale',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Datepicker','locale'];	// Tags show up in SauceLabs test output

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

	it('should display date format as \'DMY\'' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory + '#en-ES')
			.waitForElementById(app.appId)
			.execute('ilib = require("enyo-ilib"); return ilib.getLocale()').should.eventually.equal('en-ES')
			.elementById(app.datePickerId)
			.click()
			//Day First
			.elementById(app.dayLabel)
			.enyoGetParentElementId().should.eventually.equal(app.firstItem)
			//Month Second
			.elementById(app.monthLabel)
			.enyoGetParentElementId().should.eventually.equal(app.secondItem)
			//Year Third
			.elementById(app.yearLabel)
			.enyoGetParentElementId().should.eventually.equal(app.thirdItem)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-17477-FormatDateES',
	datePickerId: 'gT-17477-FormatDateES_picker',
	yearLabel: 'gT-17477-FormatDateES_picker_yearLabel',
	monthLabel: 'gT-17477-FormatDateES_picker_monthLabel',
	dayLabel: 'gT-17477-FormatDateES_picker_dayLabel',
	firstItem: 'gT-17477-FormatDateES_picker_control',
	secondItem: 'gT-17477-FormatDateES_picker_control2',
	thirdItem: 'gT-17477-FormatDateES_picker_control3'
};
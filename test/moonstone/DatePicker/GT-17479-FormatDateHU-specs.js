var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DatePicker/GT-17479-FormatDateHU',
	title = 'GT-17479 - DatePicker: \'YMD\' Format Displays for hu-HU Locale',
	directory = 'ui-tests/dist',
	tags = ['moonstone','datepicker','qa','locale'];	// Tags show up in SauceLabs test output

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

	it('should display date as \'YMD\'' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory + '/#hu-HU')
			.waitForElementById(app.appId)
			.execute('ilib = enyo.require("enyo-ilib"); return ilib.getLocale()').should.eventually.equal('hu-HU')
			.elementById(app.datePickerId)
			.click()
			//Year First
			.elementById(app.yearLabel)
			.enyoGetParentElementId().should.eventually.equal(app.firstItem)
			//Month Second
			.elementById(app.monthLabel)
			.enyoGetParentElementId().should.eventually.equal(app.secondItem)
			// Day Last
			.elementById(app.dayLabel)
			.enyoGetParentElementId().should.eventually.equal(app.thirdItem)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-17479-FormatDateHU',
	datePickerId: 'gT-17479-FormatDateHU_picker',
	yearLabel: 'gT-17479-FormatDateHU_picker_yearLabel',
	monthLabel: 'gT-17479-FormatDateHU_picker_monthLabel',
	dayLabel: 'gT-17479-FormatDateHU_picker_dayLabel',
	firstItem: 'gT-17479-FormatDateHU_picker_control',
	secondItem: 'gT-17479-FormatDateHU_picker_control2',
	thirdItem: 'gT-17479-FormatDateHU_picker_control3'
};
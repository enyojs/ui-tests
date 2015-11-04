var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandableInput/GT-11229-KeyboardSymbolsDisplayLTRinRTL',
	title = 'GT-11229 - ExpandableInput - Keyboard Symbols display in LTR in RTL setting',
	directory = 'ui-tests/dist',
	tags = ['moonstone','rtl','ltr','symbols','qa','ExpandableInput'];	// Tags show up in SauceLabs test output

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

	it('should display keyboard symbols LTR in RTL setting' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory + '/#ur-PK')
			.waitForElementById(app.expandableHeader)
			.click()
			.execute('ilib = require("enyo-ilib"); return ilib.getLocale()').should.eventually.equal('ur-PK')
			.enyoPropertySet(app.input, 'value', app.textToInput)
			.elementById(app.expandableHeader)
			.click()
			.elementById(app.headerText)
			.text().should.eventually.equal(app.textToInput)
			.elementById(app.headerText)
			.getAttribute('style').should.eventually.contain('direction: ltr')
			.nodeify(done);
	});

});

app = {
	expandableHeader: 'gT-11229-KeyboardSymbolsDisplayLTRinRTL_expandableInput_header_header',
	input: 'gT-11229-KeyboardSymbolsDisplayLTRinRTL_expandableInput_clientInput',
	headerText: 'gT-11229-KeyboardSymbolsDisplayLTRinRTL_expandableInput_header_text',
	textToInput: 'How are you?'
};
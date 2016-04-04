var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/SelectableItem/GT-17267-IconsAlignWithText',
	title = 'GT-17267 - SelectableItem: Item\'s Icon Aligns with Text',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','SelectableItem'];	// Tags show up in SauceLabs test output

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

	it('should adjust spacing according to icon' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.wrapperId)
			.getClasses().should.eventually.contain('moon-vspacing-s')
			.elementById(app.pickerHeader)
			.getComputedCss('paddingBottom').should.eventually.equal('9px')
			.elementById(app.buttonRight)
			.click()
			.elementById(app.wrapperId)
			.getClasses().should.eventually.contain('moon-vspacing-m')
			.elementById(app.pickerHeader)
			.getComputedCss('paddingBottom').should.eventually.equal('18px')
			.nodeify(done);
	});

});

app = {
	wrapperId: 'gT-17267-IconsAlignWithText_wrapper',
	buttonRight: 'gT-17267-IconsAlignWithText_spacingPicker_buttonRight',
	pickerHeader: 'gT-17267-IconsAlignWithText_expandablePicker_header'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Button/GT-16542-TransparentButtonPressedState',
	title = 'GT-16542 - Button: Pressed State for Transparent Button',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Button'];	// Tags show up in SauceLabs test output

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

	it('should show transparent pressed state' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.transparentButton)			
			.getComputedCss('backgroundColor').should.eventually.contain(app.backgroundColor)
			.elementById(app.transparentButton)
			.moveTo(0,0)
			.moveTo(10, 10)
			.moveTo()
			.elementById(app.transparentButton)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.transparentButton)
			.buttonDown()
			.elementById(app.transparentButton)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.transparentButton)
			.getComputedCss('backgroundColor').should.eventually.contain(app.spotlightColor)
			.elementById(app.appId)			
			.moveTo()
			.elementById(app.transparentButton)
			.getClasses().should.eventually.not.contain('spotlight')
			.elementById(app.transparentButton)
			.getComputedCss('backgroundColor').should.eventually.contain(app.backgroundColor)
			.nodeify(done);			
	});

});

app = {
	appId: 'gT-16542-TransparentButtonPressedState',
	transparentButton: 'gT-16542-TransparentButtonPressedState_transparentButton',
	backgroundColor: '0, 0, 0',
	spotlightColor: '207, 6, 82'
};

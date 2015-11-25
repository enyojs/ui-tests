var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Button/GT-16541-TranslucentButtonPressedState',
	title = 'GT-16541 - Button: Pressed State for Translucent Button',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'button'];	// Tags show up in SauceLabs test output

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

	it('should show translucent pressed state', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.translucentButton)			
			.getComputedCss('backgroundColor').should.eventually.contain(app.backgroundColor)
			.elementById(app.translucentButton)
			.moveTo(0,0)
			.moveTo(10, 10)
			.moveTo()
			.elementById(app.translucentButton)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.translucentButton)
			.buttonDown()
			.elementById(app.translucentButton)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.translucentButton)
			.getComputedCss('backgroundColor').should.eventually.contain(app.spotlightColor)
			.elementById(app.appId)			
			.moveTo()
			.elementById(app.translucentButton)
			.getClasses().should.eventually.not.contain('spotlight')
			.elementById(app.translucentButton)
			.getComputedCss('backgroundColor').should.eventually.contain(app.backgroundColor)
			.nodeify(done);		
	});
});

app = {
	appId: 'gT-16541-TranslucentButtonPressedState',
	translucentButton: 'gT-16541-TranslucentButtonPressedState_translucentButton',
	backgroundColor: '77, 77, 77, 0.298039',
	spotlightColor: '207, 6, 82'
};

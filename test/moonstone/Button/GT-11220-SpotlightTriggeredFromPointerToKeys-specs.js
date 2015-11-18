var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Button/GT-11220-SpotlightTriggeredFromPointerToKeys',
	title = 'GT-11220 - Button: Spotlight gets Triggered from Pointer Mode to 5way Up/Down',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','button','5way'];	// Tags show up in SauceLabs test output

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

	it('should move focus on nearest point to pointer when key is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.moveTo(0,0)
			.moveTo()
			.elementById(app.dButton)
			.moveTo(75, 130)
			.keys(helpers.keys.SpotlightUp)
			.elementById(app.dButton)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.dButton)
			.moveTo(75, 130)
			.keys(helpers.keys.Control)
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.rightButton)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-11220-SpotlightTriggeredFromPointerToKeys',
	aButton: 'gT-11220-SpotlightTriggeredFromPointerToKeys_aButton',
	dButton: 'gT-11220-SpotlightTriggeredFromPointerToKeys_captionedDButton',
	rightButton: 'gT-11220-SpotlightTriggeredFromPointerToKeys_showOnFocusCaptionRightButton'
};

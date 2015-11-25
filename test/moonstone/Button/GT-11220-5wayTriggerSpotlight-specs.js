var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Button/GT-11220-5wayTriggerSpotlight',
	title = 'GT-11220 - Button: Spotlight gets Triggered from Pointer Mode to 5way Up/Down',
	directory = 'ui-tests/dist',
	tags = ["moonstone","qa","Button","5way"];	// Tags show up in SauceLabs test output

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

	it('should focus spotlight on nearest button from pointer position' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.dButton)
			.moveTo(70, 120)
			.moveTo(80, 140)
			.moveTo(75, 130)
			.buttonDown()
			.buttonUp()
			.keys(helpers.keys.SpotlightUp)
			.elementById(app.dButton)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.dButton)
			.moveTo(70, 120)
			.moveTo(80, 140)
			.moveTo(75, 130)
			.buttonDown()
			.buttonUp()
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.rightButton)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	dButton: 'gT-11220-5wayTriggerSpotlight_captionedDButton',
	rightButton: 'gT-11220-5wayTriggerSpotlight_captionDecorator8'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/SimplePicker/GT-11261-StartsWhenButtonSpotlight',
	title = 'GT-11261 - SimplePicker: Marquee Starts when Button Obtains Spotlight',
	directory = 'ui-tests/dist',
	tags = ['Marquee', 'SimplePicker', 'QA'];	// Tags show up in SauceLabs test output

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

	it('should marquee with 5way when one arrow enabled', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightDown)
			.delay(400)
			//check if left button is disabled
			.elementById(app.buttonLeft)
			.getClasses().should.eventually.contain('disabled')
			//make sure spotlight is on right button
			.elementById(app.buttonRight)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(400)
			.elementById(app.buttonRight)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(400)
			.elementById(app.buttonRight)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(400)
			//check if right button is disabled
			.elementById(app.buttonRight)
			.getClasses().should.eventually.contain('disabled')
			//left button should receive spotlight once right button is disabled
			.elementById(app.buttonLeft)
			.getClasses().should.eventually.contain('spotlight')
			//need to delay for element to appear
			.elementById(app.buttonRight)
			.delay(1000)
			.elementById(app.hebrewText)
			.getClasses().should.eventually.contain(app.animateMarqueeClass)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-11261-StartsWhenButtonSpotlight',
	buttonRight: 'gT-11261-StartsWhenButtonSpotlight_picker1_buttonRight',
	buttonLeft: 'gT-11261-StartsWhenButtonSpotlight_picker1_buttonLeft',
	hebrewText: 'gT-11261-StartsWhenButtonSpotlight_marqueeText4_marqueeText',
	animateMarqueeClass: 'animate-marquee'
};
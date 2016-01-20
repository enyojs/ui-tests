var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/SimplePicker/GT-13631-MarqueeStartsOn5way',
	title = 'GT-13631 - SimplePicker: Marquee Starts upon 5way focus',
	directory = 'ui-tests/dist',
	tags = ['Marquee', 'SimplePicker', 'QA','P2'];	// Tags show up in SauceLabs test output

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

	it('should marquee with 5way when both arrows enabled', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightDown)
			.delay(400)
			.elementById(app.buttonLeft)
			.getClasses().should.eventually.contain('disabled')
			.elementById(app.buttonRight)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			//delay for animation check
			.delay(2000)
			//check for direction of marquee move
			.elementById(app.bostonMarquee)
			.getAttribute('style').should.eventually.contain(app.directionLeftToRight)
			.elementById(app.bostonText)
			.getClasses().should.eventually.contain(app.animateMarqueeClass)
			.keys(helpers.keys.SpotlightLeft)
			.elementById(app.bostonText)
			//wait for animation to start
			.delay(2000)
			.getClasses().should.eventually.contain(app.animateMarqueeClass)
			.nodeify(done);
	});
});

app = {
	appId: 'gT-13631-MarqueeStartsOn5way',
	buttonRight: 'gT-13631-MarqueeStartsOn5way_picker1_buttonRight',
	buttonLeft: 'gT-13631-MarqueeStartsOn5way_picker1_buttonLeft',
	bostonMarquee: 'gT-13631-MarqueeStartsOn5way_marqueeText2',
	bostonText: 'gT-13631-MarqueeStartsOn5way_marqueeText2_marqueeText',
	directionLeftToRight: 'direction: ltr',
	directionRightToLeft: 'direction: rtl',
	animateMarqueeClass: 'animate-marquee'
};

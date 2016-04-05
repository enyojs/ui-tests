var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ActivityPanels/GT-14318-BackKeyTransitionActivityPanelVideo',
	title = 'GT-14318 - BackKey: Forward Transition in ActivityPanelsWithVideo',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','BackKey','ActivityPanelsWithVideo'];	// Tags show up in SauceLabs test output

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

	it('should transition back when back is  key pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.elementById(app.panelSeven)
			.getAttribute('style').should.eventually.equal('transform: translateZ(0px);')
			.keys(helpers.keys.Back)
			.delay(500)
			.elementById(app.panelSix)
			.getAttribute('style').should.eventually.equal('transform: translateZ(0px);')
			.keys(helpers.keys.Back)
			.delay(500)
			.elementById(app.panelFive)
			.getAttribute('style').should.eventually.equal('transform: translateZ(0px);')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14318-BackKeyTransitionActivityPanelVideo',
	panelFive: 'gT-14318-BackKeyTransitionActivityPanelVideo_panel5',
	panelSix: 'gT-14318-BackKeyTransitionActivityPanelVideo_panel6',
	panelSeven: 'gT-14318-BackKeyTransitionActivityPanelVideo_panel7'
};

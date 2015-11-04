var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Panel/GT-14260-BackKeyReturnsFromVideo',
	title = 'BackKey: Back Key Returns Panels from Full Screen Video',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','BackKey','AlwaysViewingPanels'];	// Tags show up in SauceLabs test output

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

	it('should return to previous display when back key is pressed from video' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightRight)
			.elementById(app.sideHandle)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.elementById(app.videoPlayer)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.Back)
			.delay(500)
			.elementById(app.videoPlayer)
			.getComputedCss('display').should.eventually.equal('none')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14260-BackKeyReturnsFromVideo',
	sideHandle: 'gT-14260-BackKeyReturnsFromVideo_panels_showHideHandle',
	videoPlayer: 'gT-14260-BackKeyReturnsFromVideo_player'
};

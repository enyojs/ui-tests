var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18625-FocusSpotsNearestNeighbor',
	title = 'GT-18625 - VideoPlayer: Focus Spots Nearest Neighbor from Progress Bar',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','VideoPlayer','moonstone-extra'];	// Tags show up in SauceLabs test output

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

	it('should focus on nearest neighbor from progress bar' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.moveTo(0,0)
			.moveTo(10,10)
			.moveTo()
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.keys(helpers.keys.SpotlightDown)
			.delay(300)
			.elementById(app.playerControl)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightSelect)
			.delay(300)
			.elementById(app.playerClient)
			.getClasses().should.eventually.contain('shifted')
			.keys(helpers.keys.SpotlightDown)
			.delay(300)
			.elementById(app.knob)
			.getAttribute('style').should.eventually.be.ok
			.keys(helpers.keys.SpotlightUp)
			.delay(300)
			.elementById(app.fowardRewindButton)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-18625-FocusSpotsNearestNeighbor_player_video',
	playerControl: 'gT-18625-FocusSpotsNearestNeighbor_player_playerControl',
	knob: 'gT-18625-FocusSpotsNearestNeighbor_player_slider_knob',
	playerClient: 'gT-18625-FocusSpotsNearestNeighbor_player_client',
	fowardRewindButton: 'gT-18625-FocusSpotsNearestNeighbor_ffrewToggleButton'
};

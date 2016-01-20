var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-17318-PopupWithControlsDisplays',
	title = 'GT-17318 - VideoPlayer: Status Indicator Popup Centers and Aligns with Playback Controls',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','VideoPlayer','controls','moonstone-extra'];	// Tags show up in SauceLabs test output

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

	it('should display popup with controls and playback controls center aligns' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)			
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.delay(1000)
			.elementById(app.playerControls)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.playbackControls)
			.getComputedCss('text-align').should.eventually.equal('center')
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-17318-PopupWithControlsDisplays_player_video',
	playerControls: 'gT-17318-PopupWithControlsDisplays_player_playerControl',
	playbackControls: 'gT-17318-PopupWithControlsDisplays_player_playbackControls'
};
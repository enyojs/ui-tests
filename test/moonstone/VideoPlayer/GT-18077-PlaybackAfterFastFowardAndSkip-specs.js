var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18077-PlaybackAfterFastFowardAndSkip',
	title = 'VideoPlayer: Playback resumes after Steps of Forwarding then Skipping',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','video'];	// Tags show up in SauceLabs test output

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

	it('should resume playback after fast foward and skip' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.delay(2000)
			.elementById(app.playerControl)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.fastFowardButton)
			.click()
			.delay(2000)
			.elementById(app.videoPlayer)
			.getProperty('playbackRate').should.eventually.equal(2)			
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.jumpBackButton)
			.click()
			.elementById(app.videoPlayer)
			.getProperty('currentTime').should.be.eventually.below(2)
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.elementById(app.videoPlayer)
			.getProperty('playbackRate').should.eventually.equal(1)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-18077-PlaybackAfterFastFowardAndSkip',
	videoPlayer: 'gT-18077-PlaybackAfterFastFowardAndSkip_player_video',
	playerControl: 'gT-18077-PlaybackAfterFastFowardAndSkip_player_playerControl',
	fastFowardButton: 'gT-18077-PlaybackAfterFastFowardAndSkip_player_fastForward',
	jumpBackButton: 'gT-18077-PlaybackAfterFastFowardAndSkip_player_jumpBack'
};

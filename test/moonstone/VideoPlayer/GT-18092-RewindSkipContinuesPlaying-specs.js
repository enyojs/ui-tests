var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18092-RewindSkipContinuesPlaying',
	title = 'VideoPlayerInline - Rewind Skip and Back to List resumes Playback',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','VideoPlayer','rewind'];	// Tags show up in SauceLabs test output

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

	it('should resume playing after rewind skip' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.enyoPropertyMethod(app.videoPlayer, 'isPaused()').should.eventually.equal(false)
			.elementById(app.fullscreenButton)
			.click()
			.elementById(app.fowardSkip)
			.click()
			.delay(5000)
			.enyoPropertyMethod(app.videoPlayer, 'getCurrentTime()').should.eventually.above(30)
			.elementById(app.rewindSkip)
			.click()
			.elementById(app.exitFullscreen)
			.click()
			.delay(3000)
			.enyoPropertyMethod(app.videoPlayer, 'getCurrentTime()').should.eventually.below(30)
			.enyoPropertyMethod(app.videoPlayer, 'isPaused()').should.eventually.equal(false)
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-18092-RewindSkipContinuesPlaying_player_video',
	fullscreenButton: 'gT-18092-RewindSkipContinuesPlaying_player_ilFullscreen',
	rewindSkip: 'gT-18092-RewindSkipContinuesPlaying_player_jumpBack',
	fowardSkip: 'gT-18092-RewindSkipContinuesPlaying_player_jumpForward',
	exitFullscreen: 'gT-18092-RewindSkipContinuesPlaying_videoFullscreenToggleButton'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18091-FowardSkipResumesPlaying',
	title = 'GT-18091 - VideoPlayerInline - Forward Skip and Back to List resumes Playback',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','VideoPlayer'];	// Tags show up in SauceLabs test output

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

	it('should continue playing after foward skip is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.elementById(app.fullscreenButton)
			.click()
			.elementById(app.fowardSkip)
			.click()
			.delay(5000)
			.elementById(app.videoPlayer)
			.getProperty('currentTime').should.eventually.above(30)
			.elementById(app.rewindSkip)
			.click()
			.delay(2000)
			.elementById(app.videoPlayer)
			.getProperty('currentTime').should.eventually.below(30)
			.elementById(app.fowardSkip)
			.click()
			.elementById(app.exitFullscreen)
			.click()
			.delay(3000)
			.elementById(app.videoPlayer)
			.getProperty('currentTime').should.eventually.above(30)
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.nodeify(done);
	});
});

app = {
	videoPlayer: 'gT-18091-FowardSkipResumesPlaying_player_video',
	fullscreenButton: 'gT-18091-FowardSkipResumesPlaying_player_ilFullscreen',
	rewindSkip: 'gT-18091-FowardSkipResumesPlaying_player_jumpBack',
	fowardSkip: 'gT-18091-FowardSkipResumesPlaying_player_jumpForward',
	exitFullscreen: 'gT-18091-FowardSkipResumesPlaying_videoFullscreenToggleButton'
};
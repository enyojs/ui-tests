var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18076-PlaybackAfterRewindAndSkip',
	title = 'GT-18076 - VideoPlayer: Playback resumes after Steps of Rewinding then Skipping',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','video','moonstone-extra'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var previousTime = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should resume playback after rewind and skip' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.delay(2000)
			.elementById(app.playerControl)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.videoPlayer)
			.getProperty('currentTime').then(setPreviousTime)
			.elementById(app.rewindButton)
			.moveTo(20,20)
			.click()
			.delay(2000)
			.elementById(app.videoPlayer)
			.getProperty('playbackRate').should.eventually.equal(-2)
			.elementById(app.videoPlayer)
			.getProperty('currentTime').then(checkTime)
			.elementById(app.jumpFowardButton)
			.click()
			.delay(2000)
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.elementById(app.videoPlayer)
			.getProperty('playbackRate').should.eventually.equal(1)
			.nodeify(done);
	});

	var setPreviousTime = function(currentTime){
		previousTime = currentTime;
	};

	var checkTime = function(currentTime){
		previousTime.should.be.above(currentTime);
	};
});

app = {
	appId: 'gT-18076-PlaybackAfterRewindAndSkip',
	videoPlayer: 'gT-18076-PlaybackAfterRewindAndSkip_player_video',
	playerControl: 'gT-18076-PlaybackAfterRewindAndSkip_player_playerControl',
	rewindButton: 'gT-18076-PlaybackAfterRewindAndSkip_player_rewind',
	jumpFowardButton: 'gT-18076-PlaybackAfterRewindAndSkip_player_jumpForward'
};
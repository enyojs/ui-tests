var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18416-SlowRewindFowardIconsInPopup',
	title = 'GT-18416 - VideoPlayer: Slow Rewind/Forward Icons display in Status Indicator Popup',
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

	it('should show icons for slow forward and slow rewind' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.delay(1000)
			//pause video
			.elementById(app.playButton)
			.moveTo(10,10)
			.click()
			.elementById(app.fastForwardButton)
			.click()
			.delay(2000)
			.elementById(app.rightIcon)
			.getClasses().should.eventually.contain('moon-icon-pauseforward')
			.elementById(app.rewindButton)
			.click()
			.delay(2000)
			.elementById(app.leftIcon)
			.getClasses().should.eventually.contain('moon-icon-pausebackward')
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-18416-SlowRewindFowardIconsInPopup_player_video',
	playButton: 'gT-18416-SlowRewindFowardIconsInPopup_player_fsPlayPause',
	fastForwardButton: 'gT-18416-SlowRewindFowardIconsInPopup_player_fastForward',
	rewindButton: 'gT-18416-SlowRewindFowardIconsInPopup_player_rewind',
	leftIcon: 'gT-18416-SlowRewindFowardIconsInPopup_player_slider_feedback_leftIcon',
	rightIcon: 'gT-18416-SlowRewindFowardIconsInPopup_player_slider_feedback_rightIcon'
};

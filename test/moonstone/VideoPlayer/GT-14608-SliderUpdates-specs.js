var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-14608-SliderUpdates',
	title = 'GT-14608 - VideoPlayerInline: Slider Updates in Fullscreen and Inline Player',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'video', 'qa'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser,
		inlineWidth = 0,
		pausedWidth = 0,
		fullscreeWidth = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('Should update slider when video is playing', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(7000)
			//check to make sure data is loaded and playing
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			//Pause video
			.elementById(app.playerPlayButton)
			.click()
			//Must use getAttribute to get width in percentage, getComputedCss returns pixels.
			.elementById(app.inlineProgress).getAttribute('style')
			.then(setWidth)
			//Fullscreen
			.elementById(app.fullscreenButton)
			.click()
			.delay(5000)
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(true)
			//check fullscreen
			.elementById(app.fullscreenControl).getAttribute('style').should.eventually.not.contain('display: none;')
			.elementById(app.fullscreenProgress).getAttribute('style')
			.then(checkWidth)
			.elementById(app.videoPlayer)
			.getProperty('currentTime').then(checkTime)
			.elementById(app.fullscreenPlayButton)
			.click()
			.delay(5000)
			.elementById(app.fullscreenPlayButton)
			.click()
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(true)
			.elementById(app.exitFullscreen)
			.click()
			.delay(1000)
			.elementById(app.fullscreenControl).getAttribute('style').should.eventually.contain('display: none;')
			.elementById(app.inlineProgress).getAttribute('style').then(setWidth)
			.elementById(app.fullscreenButton)
			.click()
			.elementById(app.fullscreenControl).getAttribute('style').should.eventually.not.contain('display: none;')
			.elementById(app.fullscreenProgress).getAttribute('style')
			.then(checkWidth)
			.elementById(app.videoPlayer)
			.getProperty('currentTime').then(checkTime)
			.nodeify(done);
	});

	//set width when paused
	var setWidth = function(res){
		var percentStr = res.substring(res.indexOf(':')+1, res.indexOf('%')).trim();
		inlineWidth = parseFloat(percentStr);
	};

	//check if the fullscreen width is equal to inline width
	var checkWidth = function(res){
		var percentStr = res.substring(res.indexOf(':')+1, res.indexOf('%')).trim();
		fullscreeWidth = parseFloat(percentStr);
		fullscreeWidth.should.be.closeTo(inlineWidth, 0.5);
		fullscreeWidth.should.be.above(pausedWidth);
		pausedWidth = fullscreeWidth;
	};

	//check if time percentage is around the same as fullscreen width
	var checkTime = function(res){
		var percentageDuration = res/60 * 100;
		//to account for video loading delay we have a 2 percent margin of error
		percentageDuration.should.be.closeTo(fullscreeWidth, 2);
	};

});

app = {
	inlineProgress: 'gT-14608-SliderUpdates_player_progressStatus',
	fullscreenProgress: 'gT-14608-SliderUpdates_player_slider_bar',
	videoPlayer: 'gT-14608-SliderUpdates_player_video',
	playerPlayButton: 'gT-14608-SliderUpdates_player_ilPlayPause',
	fullscreenControl: 'gT-14608-SliderUpdates_player_fullscreenControl',
	fullscreenButton: 'gT-14608-SliderUpdates_player_ilFullscreen',
	fullscreenPlayButton: 'gT-14608-SliderUpdates_player_fsPlayPause',
	exitFullscreen: 'gT-14608-SliderUpdates_videoFullscreenToggleButton',
	currentTime: 'gT-14608-SliderUpdates_player_currTime'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-16706-ElapsedTimeShowsInBetweenTransportSlider',
	title = 'GT-16706 - VideoPlayer: Elapsed time\'s indicator partially displays behind the Video TransportSlider',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','VideoPlayer'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var knobPosition = 0;

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

	var setPosition = function(response){
		knobPosition = parseInt(response);
	};

	/*
	Check that pixels width of slider bar is within the width of the knob
	knob's width is 96px and scaled 0.5 so width is 48px.
	For progress bar to be within then the knob and the progress bar width needs to be within 24px of each side
	*/
	var checkPosition = function(response){
		var widthPosition = parseInt(response);
		widthPosition.should.be.closeTo(knobPosition, 24);
	};

	it('should have elapsed time indicator shows partially behind Video Transport Slider' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.delay(1000)
			.elementById(app.playerControl)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.progressBar)
			.moveTo(100, 50)
			.moveTo()
			.click()
			.delay(500)
			.elementById(app.knob)
			.moveTo()
			.getComputedCss('left').then(setPosition)
			.elementById(app.elapsedTimeBar)
			.getComputedCss('width').then(checkPosition)
			.nodeify(done);
	});
});

app = {
	videoPlayer: 'gT-16706-ElapsedTimeShowsInBetweenTransportSlider_player_video',
	playerControl: 'gT-16706-ElapsedTimeShowsInBetweenTransportSlider_player_playerControl',
	progressBar: 'gT-16706-ElapsedTimeShowsInBetweenTransportSlider_player_slider',
	elapsedTimeBar: 'gT-16706-ElapsedTimeShowsInBetweenTransportSlider_player_slider_bar',
	knob: 'gT-16706-ElapsedTimeShowsInBetweenTransportSlider_player_slider_knob',
	playButton: 'gT-16706-ElapsedTimeShowsInBetweenTransportSlider_player_fsPlayPause'
};

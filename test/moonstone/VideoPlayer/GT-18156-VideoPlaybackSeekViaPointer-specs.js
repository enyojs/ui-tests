var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18156-VideoPlaybackSeekViaPointer',
	title = 'GT-18156 - VideoPlayer: Playback Seeks to Video TransportSlider Selection via Pointer',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','VideoPlayer','moonstone-extra'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var labelTime = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should seek via transportation slider via pointer' , function (done) {
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
			.elementById(app.progressBar)
			.moveTo(0,0)
			.moveTo(10,10)
			.moveTo()
			.delay(1000)
			.elementById(app.knob)
			.getAttribute('style').should.eventually.be.ok
			.elementById(app.popupLabelTimeText)
			.text().then(setLabelTime)
			.elementById(app.progressBar)
			.click()
			.delay(500)
			.elementById(app.timeDurationText)
			.text().then(checkTime)
			.elementById(app.progressBar)
			.moveTo(100, 20)
			.elementById(app.knob)
			.getAttribute('style').should.eventually.be.ok
			.elementById(app.popupLabelTimeText)
			.text().then(setLabelTime)
			.elementById(app.progressBar)
			.moveTo(100, 20)
			.buttonDown()
			.buttonUp()
			.delay(500)
			.elementById(app.timeDurationText)
			.text().then(checkTime)
			.nodeify(done);
	});

	var setLabelTime = function(currentLabelTime){
		labelTime = parseInt(currentLabelTime.split(':')[1]);
	};

	//Check if times are within 2 seconds of each other
	var checkTime = function(currentTimeText){
		var currentTime = parseInt(currentTimeText.split(':')[1]);
		currentTime.should.be.closeTo(labelTime, 2);
	};

});

app = {
	videoPlayer: 'gT-18156-VideoPlaybackSeekViaPointer_player_video',
	knob: 'gT-18156-VideoPlaybackSeekViaPointer_player_slider_knob',
	timeDurationText: 'gT-18156-VideoPlaybackSeekViaPointer_player_slider_beginTickText',
	popupLabelTimeText: 'gT-18156-VideoPlaybackSeekViaPointer_player_slider_popupLabelText',
	progressBar: 'gT-18156-VideoPlaybackSeekViaPointer_player_slider'
};

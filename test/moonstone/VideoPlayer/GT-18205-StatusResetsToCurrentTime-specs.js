var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-18205-StatusResetsToCurrentTime',
	title = 'GT-18205 - VideoPlayer: Status Indicator Popup Resets to Current Paused Time',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','VideoPlayer'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var pausedTime = 0;

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

	var setTime = function(videoTime){
		pausedTime = videoTime;	
	};

	var checkTime = function(timeText){
		var labelTime = parseInt(timeText.split(':')[1]);
		labelTime.should.be.closeTo(pausedTime, 1);
	};

	it('should have popup reset to paused time when mouse leaves progress area' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			.elementById(app.appId)
			.moveTo(10,10)
			.moveTo(20,20)
			.moveTo()
			.keys(helpers.keys.SpotlightDown)
			.delay(2000)
			.elementById(app.playButton)
			.click()
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(true)
			.elementById(app.videoPlayer)
			.getProperty('currentTime').then(setTime)
			.elementById(app.sliderBar)
			.moveTo(10,10)
			.moveTo(20,20)
			.moveTo()
			.delay(1000)
			.elementById(app.appId)
			.moveTo()					
			.delay(1000)
			.elementById(app.popupLabel)
			.text().then(checkTime)			
			.nodeify(done);
	});
});

app = {
	appId: 'gT-18205-StatusResetsToCurrentTime',
	videoPlayer: 'gT-18205-StatusResetsToCurrentTime_player_video',
	playButton: 'gT-18205-StatusResetsToCurrentTime_player_fsPlayPause',
	sliderBar: 'gT-18205-StatusResetsToCurrentTime_player_slider_bgbar',
	popupLabel: 'gT-18205-StatusResetsToCurrentTime_player_slider_popupLabelText'
};

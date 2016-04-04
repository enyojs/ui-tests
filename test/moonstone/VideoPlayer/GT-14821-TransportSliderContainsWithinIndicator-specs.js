var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-14821-TransportSliderContainsWithinIndicator',
	title = 'GT-14821 - VideoPlayer: Video TransportSlider displays and contains within the Progress Indicator',
	directory = 'ui-tests/dist',
	tags = ['moonstona','qa','VideoPlayer'];	// Tags show up in SauceLabs test output

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

	it('should display inside progess indicator' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.delay(1000)
			.elementById(app.progressBar)
			.moveTo()
			.moveTo(1, 15)
			.moveTo(1, 30)
			.elementById(app.knob)
			.delay(500)
			.elementById(app.knob)
			.getLocation().should.eventually.have.property('x')
			.should.be.eventually.below(0)
			.elementById(app.progressBar)
			.moveTo(1909, 30)
			.elementById(app.knob)
			.getLocation().then(function(location){
				var rightSideLocation = location.x + 48;
				rightSideLocation.should.be.above(1920);
			})
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-14821-TransportSliderContainsWithinIndicator_player_video',
	playerControl: 'gT-14821-TransportSliderContainsWithinIndicator_player_playerControl',
	progressBar: 'gT-14821-TransportSliderContainsWithinIndicator_player_slider',
	knob: 'gT-14821-TransportSliderContainsWithinIndicator_player_slider_knob'
};
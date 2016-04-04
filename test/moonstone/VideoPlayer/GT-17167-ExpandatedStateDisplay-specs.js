  var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-17167-ExpandatedStateDisplay',
	title = 'GT-17167 - VideoPlayer: Expanded Press State displays on Video TransportSlider',
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

	it('should display expanded white circle when button pressed down' , function (done) {
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
			.keys(helpers.keys.SpotlightDown)
			.delay(300)
			.elementById(app.playerControl)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.progressBar)
			.moveTo(0,0)
			.moveTo(10,10)
			.moveTo()
			.delay(1000)
			.buttonDown()
			.delay(1000)
			.elementById(app.progressBar)
			.getClasses().should.eventually.contain('pressed')
			.elementById(app.knob)
			.getComputedCss('transform').should.eventually.contain('0.75')
			.buttonUp()
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-17167-ExpandatedStateDisplay_player_video',
	playerControl: 'gT-17167-ExpandatedStateDisplay_player_playerControl',
	progressBar: 'gT-17167-ExpandatedStateDisplay_player_slider',
	knob: 'gT-17167-ExpandatedStateDisplay_player_slider_knob',
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-14298-BackKeyDismissesBanners',
	title = 'BackKey: Back Key dismisses Playback Controls/Channel Banner',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','BackKey','VideoPlayer'];	// Tags show up in SauceLabs test output

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

	it('should dismiss playback controls and channel banner when back key is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.videoPlayer)
			.delay(5000)
			.enyoPropertyGet(app.videoPlayer, 'onloadeddata').should.eventually.equal('dataloaded')
			.elementById(app.videoPlayer)
			.getProperty('paused').should.eventually.equal(false)
			//moves made to put focus on video
			.elementById(app.videoPlayer)
			.moveTo(0,0)
			.moveTo(10,10)
			.moveTo()			
			.keys(helpers.keys.SpotlightUp)			
			.elementById(app.videoInfoClient)
			.getComputedCss('display').should.eventually.not.equal('none')
			.back()
			.elementById(app.videoInfoClient)
			.getComputedCss('display').should.eventually.equal('none')			
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.playerControl)
			.getComputedCss('display').should.eventually.not.equal('none')
			.back()
			.elementById(app.playerControl)
			.getComputedCss('display').should.eventually.equal('none')
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-14298-BackKeyDismissesBanners_player_video',
	videoInfoClient: 'gT-14298-BackKeyDismissesBanners_player_videoInfoHeaderClient',
	playerControl: 'gT-14298-BackKeyDismissesBanners_player_playerControl'
};

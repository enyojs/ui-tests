var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/VideoPlayer/GT-14820-IconsDisplayInPopup',
	title = 'GT-14820 - VideoPlayer: Icons display in Status Indicator Popup',
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

	it('should display play/pause icon next to popup label' , function (done) {
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
			.elementById(app.playButton)
			.moveTo(10, 10)
			.click()
			.delay(500)
			.elementById(app.rightIcon)
			.getClasses().should.eventually.contain('moon-icon-pause')
			.elementById(app.playButton)
			.click()
			.delay(500)
			.elementById(app.rightIcon)
			.getClasses().should.eventually.contain('moon-icon-play')
			.nodeify(done);
	});

	it('should display forward icon with proper times next to popup label' , function (done) {
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
			.elementById(app.fastForward)
			.moveTo(10, 10)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('2X')
			.elementById(app.rightIcon)
			.getClasses().should.eventually.contain('moon-icon-forward')
			.elementById(app.fastForward)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('4X')
			.elementById(app.rightIcon)
			.getClasses().should.eventually.contain('moon-icon-forward')
			.elementById(app.fastForward)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('8X')
			.elementById(app.rightIcon)
			.getClasses().should.eventually.contain('moon-icon-forward')
			.elementById(app.fastForward)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('16X')
			.elementById(app.rightIcon)
			.getClasses().should.eventually.contain('moon-icon-forward')
			.nodeify(done);
	});

	it('should display rewind icon with proper times next to popup label' , function (done) {
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
			.elementById(app.rewind)
			.moveTo(10, 10)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('2X')
			.elementById(app.leftIcon)
			.getClasses().should.eventually.contain('moon-icon-backward')
			.elementById(app.rewind)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('4X')
			.elementById(app.leftIcon)
			.getClasses().should.eventually.contain('moon-icon-backward')
			.elementById(app.rewind)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('8X')
			.elementById(app.leftIcon)
			.getClasses().should.eventually.contain('moon-icon-backward')
			.elementById(app.rewind)
			.click()
			.elementById(app.feedText)
			.text().should.eventually.equal('16X')
			.elementById(app.leftIcon)
			.getClasses().should.eventually.contain('moon-icon-backward')
			.nodeify(done);
	});

});

app = {
	videoPlayer: 'gT-14820-IconsDisplayInPopup_player_video',
	playerControl: 'gT-14820-IconsDisplayInPopup_player_playerControl',
	progressBar: 'gT-14820-IconsDisplayInPopup_player_slider',
	elapsedTimeBar: 'gT-14820-IconsDisplayInPopup_player_slider_bar',
	knob: 'gT-14820-IconsDisplayInPopup_player_slider_knob',
	playButton: 'gT-14820-IconsDisplayInPopup_player_fsPlayPause',
	rightIcon: 'gT-14820-IconsDisplayInPopup_player_slider_feedback_rightIcon',
	leftIcon: 'gT-14820-IconsDisplayInPopup_player_slider_feedback_leftIcon',
	fastForward: 'gT-14820-IconsDisplayInPopup_player_fastForward',
	rewind: 'gT-14820-IconsDisplayInPopup_player_rewind',
	feedText: 'gT-14820-IconsDisplayInPopup_player_slider_feedback_feedText'
};

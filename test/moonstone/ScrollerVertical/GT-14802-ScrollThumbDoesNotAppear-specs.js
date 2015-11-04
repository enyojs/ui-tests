var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ScrollerVertical/GT-14802-ScrollThumbDoesNotAppear',
	title = 'GT-14802 - PageUp/Down: Scroll Thumb Does Not Display at the end and top of the Viewport',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','vertical scroller'];	// Tags show up in SauceLabs test output

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

	it('Should hide scroll thumb when screen reaches top/bottom', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.moveTo()			
			.elementById(app.picker)
			.moveTo()
			//extra Spotlight Down for chrome to behave like webOS
			.keys(helpers.keys.SpotlightDown)
			.delay(200)
			.keys(helpers.keys.Pagedown)
			.delay(200)
			.keys(helpers.keys.Pagedown)
			.delay(200)
			.keys(helpers.keys.Pagedown)
			.delay(200)
			.keys(helpers.keys.Pagedown)
			.delay(200)
			.keys(helpers.keys.Pagedown)
			.delay(1000)
			.elementById(app.scrollThumb)
			.getClasses().should.eventually.contain('hidden')
			.keys(helpers.keys.Pagedown)
			.delay(200)
			.elementById(app.scrollThumb)
			.getClasses().should.eventually.contain('hidden')
			.keys(helpers.keys.Pageup)
			.delay(200)
			.keys(helpers.keys.Pageup)
			.delay(200)
			.keys(helpers.keys.Pageup)
			.delay(200)
			.keys(helpers.keys.Pageup)
			.delay(1000)
			.elementById(app.scrollThumb)
			.getClasses().should.eventually.contain('hidden')
			.keys(helpers.keys.Pageup)
			.delay(200)
			.elementById(app.scrollThumb)
			.getClasses().should.eventually.contain('hidden')
			.nodeify(done);
	});

});

app = {
	scrollThumb: 'gT-14802-ScrollThumbDoesNotAppear_scroller_strategy_vthumb',
	appId: 'gT-14802-ScrollThumbDoesNotAppear',
	picker: 'gT-14802-ScrollThumbDoesNotAppear_expandablePicker'
};
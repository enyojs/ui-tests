var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Drawer/GT-18476-DrawerDisplaysOverVideo',
	title = 'GT-18476 - History: Drawer Displays over Fullscreen Video',
	directory = 'ui-tests/dist',
	tags = ["moonstone","qa","VideoPlayer","History","Drawer"];	// Tags show up in SauceLabs test output

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

	it('should display drawer over video' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.sideHandle)
			.keys(helpers.keys.SpotlightRight)
			.keys(helpers.keys.SpotlightRight)
			.keys(helpers.keys.SpotlightRight)
			.keys(helpers.keys.SpotlightSelect)
			.delay(2000)
			.keys(helpers.keys.SpotlightUp)
			.elementById(app.videoHeader)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.drawerIcon)
			.click()
			.delay(2000)
			.elementById(app.handleClient)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.drawerActivator)
			.getClasses().should.eventually.contain('open')
			.elementById(app.partialButton)
			.click()
			.delay(2000)
			.elementById(app.openMore)
			.click()
			.delay(2000)
			.elementById(app.partialDrawer)
			.getAttribute('style').should.eventually.contain('0px')
			.elementById(app.closeDrawer)
			.click()
			.delay(2000)
			.elementById(app.partialDrawer)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.drawersClient)
			.getAttribute('style').should.eventually.contain('138px')
			.nodeify(done);
	});

});

app = {
	sideHandle: 'gT-18476-DrawerDisplaysOverVideo_panels_showHideHandle',
	videoHeader: 'gT-18476-DrawerDisplaysOverVideo_player_videoInfoHeaderClient',
	drawerIcon: 'gT-18476-DrawerDisplaysOverVideo_drawers_activatorIcon',
	partialButton: 'gT-18476-DrawerDisplaysOverVideo_drawers_handleButton',
	drawerActivator: 'gT-18476-DrawerDisplaysOverVideo_drawers_activator',
	handleClient: 'gT-18476-DrawerDisplaysOverVideo_drawers_handleContainer_client',
	partialDrawer: 'gT-18476-DrawerDisplaysOverVideo_partialDrawer',
	openMore: 'gT-18476-DrawerDisplaysOverVideo_openMoreButton_client',
	closeDrawer: 'gT-18476-DrawerDisplaysOverVideo_button3_client',
	drawersClient: 'gT-18476-DrawerDisplaysOverVideo_drawers_client'
};

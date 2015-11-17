var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Drawer/GT-11210-BreadcrumRetailsFalseSpotlight',
	title = 'GT-11210 - Drawer: Breadcrumbs and off-Screen Panels retains False "Spotlight" Value',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Drawer'];	// Tags show up in SauceLabs test output

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

	it('should change drawer image based on click' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.drawer)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			//go to third panel
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			//check panel text
			.elementById(app.thirdPanel)
			.getAttribute('style').should.eventually.equal('transform: translateZ(0px);')			
			.keys(helpers.keys.SpotlightUp)
			.delay(500)
			.keys(helpers.keys.SpotlightUp)
			.delay(500)
			//open drawer
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.elementById(app.drawer)
			//check if open
			.getClasses().should.eventually.contain('open')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.drawerButton)
			//check drawer button focused
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.thirdPanelItem)
			//check panel item focused
			.getClasses().should.eventually.contain('spotlight')
			//check that spotlight is not on another element
			.elementsByClassName('spotlight').should.eventually.have.length(1)
			.elementById(app.drawer)
			.getClasses().should.eventually.not.contain('open')
			.nodeify(done);
	});

});

app = {
	thirdPanel: 'gT-11210-BreadcrumRetailsFalseSpotlight_panel3',
	drawer: 'gT-11210-BreadcrumRetailsFalseSpotlight_drawers_activator',
	drawerButton: 'gT-11210-BreadcrumRetailsFalseSpotlight_drawers_handleButton',
	thirdPanelItem: 'gT-11210-BreadcrumRetailsFalseSpotlight_item8'
};

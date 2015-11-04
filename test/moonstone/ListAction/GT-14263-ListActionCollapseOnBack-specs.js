var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ListAction/GT-14263-ListActionCollapseOnBack',
	title = 'BackKey: ListActions Collapses upon Back Key',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ListActions','BackKey'];	// Tags show up in SauceLabs test output

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

	it('should collapse list on when back is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightUp)
			.delay(500)
			.elementById(app.dummyIcon)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.elementById(app.drawerClient)
			.getClasses().should.eventually.contain('open')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.Back)
			.delay(500)
			.elementById(app.drawerClient)
			.getClasses().should.eventually.not.contain('open')
			.elementById(app.dummyIcon)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14263-ListActionCollapseOnBack',
	dummyIcon: 'gT-14263-ListActionCollapseOnBack_listActions2_activator',
	drawerClient: 'gT-14263-ListActionCollapseOnBack_listActions2_drawer_client'
};

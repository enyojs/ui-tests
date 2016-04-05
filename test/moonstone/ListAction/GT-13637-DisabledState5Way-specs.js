var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ListAction/GT-13637-DisabledState5Way',
	title = 'GT-13637 - ListActions: Disabled State is Triggered via 5way',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ListAction','5way'];	// Tags show up in SauceLabs test output

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

	it('should disable arrow at end of the list' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appID)
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightRight)
			.delay(300)
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			//make sure menu opens
			.elementById(app.drawerClient)
			.getClasses().should.eventually.contain('open')
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.delay(500)
			//check for disabled arrow
			.elementById(app.pageDownControl)
			.getClasses().should.eventually.contain('disabled')
			.keys([helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp,helpers.keys.SpotlightUp])
			.delay(1000)
			.elementById(app.pageUpControl)
			.getClasses().should.eventually.contain('disabled')
			.nodeify(done);
	});

});

app = {
	appID: 'gT-13637-DisabledState5Way',
	drawerClient: 'gT-13637-DisabledState5Way_listActions3_drawer_client',
	pageDownControl: 'gT-13637-DisabledState5Way_scroller4_strategy_pageDownControl',
	pageUpControl: 'gT-13637-DisabledState5Way_scroller4_strategy_pageUpControl'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DynamicPanels/GT-18195-ListActionRetainedBackTransition',
	title = 'GT-18195 - DynamicPanels: ListActions is Retained in Back Transition',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DynamicPanels','moonstone-extra'];	// Tags show up in SauceLabs test output

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

	it('should retain list actions during a back transition' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.panel0Item)
			.click()
			.delay(3000)
			.elementById(app.listActionActivator)
			.click()
			.elementById(app.drawerClient)
			.getClasses().should.eventually.contain('open')
			.elementById(app.panel1Item)
			.click()
			.delay(3000)
			.elementById(app.breadcrumb)
			.click()
			.elementById(app.drawerClient)
			.getClasses().should.eventually.contain('open')
			.nodeify(done);
	});

});

app = {
	panel0Item: 'gT-18195-ListActionRetainedBackTransition_repeater_control_item',
	listActionActivator: 'gT-18195-ListActionRetainedBackTransition_listActions2_activator',
	panel1Item: 'gT-18195-ListActionRetainedBackTransition_repeater2_control_item',
	drawerClient: 'gT-18195-ListActionRetainedBackTransition_listActions2_drawer_client',
	breadcrumb: 'gT-18195-ListActionRetainedBackTransition_panels_breadcrumb2'
};

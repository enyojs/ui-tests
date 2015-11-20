var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DynamicPanels/GT-18194-ListActionNotRetainForwardTransitions',
	title = 'GT-18194 - DynamicPanels: ListActions is Not Retained in Forward Transition',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DynamicPanels'];	// Tags show up in SauceLabs test output

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

	it('should not retain list actions during a forward transition' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.panel0Item)
			.click()
			.delay(3000)
			.elementById(app.listActionActivator)
			.click()
			.delay(1000)
			.elementById(app.drawerClient)
			.getClasses().should.eventually.contain('open')
			.elementById(app.breadcrumb)
			.click()
			.delay(3000)
			.elementById(app.panel0Item)
			.click()
			.delay(3000)
			.elementsByClassName('open').should.eventually.have.length(0)
			.nodeify(done);
	});

});

app = {
	panel0Item: 'gT-18194-ListActionNotRetainForwardTransitions_repeater_control_item',
	listActionActivator: 'gT-18194-ListActionNotRetainForwardTransitions_listActions2_activator',
	panel1Item: 'gT-18194-ListActionNotRetainForwardTransitions_repeater2_control_item',
	drawerClient: 'gT-18194-ListActionNotRetainForwardTransitions_listActions2_drawer_client',
	breadcrumb: 'gT-18194-ListActionNotRetainForwardTransitions_panels_breadcrumb'
};

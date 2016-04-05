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
		helpers.epack(path, function(){
			browser = helpers.initBrowser(title, tags, base, path, done);
		});
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
			.elementById(app.contextualPopupActivator)
			.click()
			.delay(1000)
			.elementById(app.contextualPopupActivator)
			.getClasses().should.eventually.contain('active')
			.elementById(app.floatingLayer)
			.moveTo(10,10)
			.buttonDown()
			.buttonUp()
			.delay(3000)
			.elementById(app.contextualPopupActivator)
			.getClasses().should.eventually.not.contain('active')					
			.nodeify(done);
	});

});

app = {
	panel0Item: 'gT-18194-ListActionNotRetainForwardTransitions_repeater_control_item',
	contextualPopupActivator: 'gT-18194-ListActionNotRetainForwardTransitions_contextualPopupDecorator2_activator',	
	floatingLayer: 'floatingLayer',
	breadcrumb: 'gT-18194-ListActionNotRetainForwardTransitions_panels_breadcrumb'
};

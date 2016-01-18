var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/LightPanel/GT-18046-FocusDisplaysInContainer',
	title = 'GT-18046-LightPanels: Focus displays in Container via 5way Navigation',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','LightPanels'];	// Tags show up in SauceLabs test output

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

	it('should display focus on container via 5way' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.item1)
			.click()
			.delay(2000)
			.elementById(app.backButton2)
			.click()
			.delay(2000)					
			.keys(helpers.keys.SpotlightUp)
			.delay(2000)
			.elementById(app.controlItem)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightDown)
			.delay(2000)
			.elementById(app.item1)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightUp)
			.delay(2000)
			.elementById(app.controlItem)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightUp)
			.delay(2000)
			.elementById(app.backButton)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightDown)
			.delay(2000)
			.elementById(app.controlItem)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	item1: 'gT-18046-FocusDisplaysInContainer_item',
	controlItem: 'gT-18046-FocusDisplaysInContainer_control_controlPanel_item',
	backButton: 'gT-18046-FocusDisplaysInContainer_button',
	backButton2: 'gT-18046-FocusDisplaysInContainer_button2'
};

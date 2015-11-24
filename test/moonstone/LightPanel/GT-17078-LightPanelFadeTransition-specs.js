var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/LightPanel/GT-17078-LightPanelFadeTransition',
	title = 'GT-17078 - LightPanels: Fade Transition displays upon Creation',
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

	it('should have fade transition on the next panel' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.item)
			.click()
			.waitForElementById(app.client2)
			.getComputedCss('transition').should.eventually.equal('opacity 0.5s ease-out 0s')
			.elementById(app.client2)
			.getComputedCss('opacity').should.eventually.equal('0')
			.elementById(app.client2)
			.delay(2000)
			.getComputedCss('opacity').should.eventually.equal('1')
			.nodeify(done);
	});

});

app = {
	item: 'gT-17078-LightPanelFadeTransition_item',
	client2: 'gT-17078-LightPanelFadeTransition_lightPanel2_client'
};

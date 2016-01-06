var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/LightPanel/GT-19111-FocusOnLastItemFromBack',
	title = 'GT-19111 - LightPanels: Focus displays on last Focused Item from Back',
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

	it('should focus on last focused item when back is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.item5)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.item5)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.elementById(app.backButton)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.elementById(app.item5)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.item6)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.elementById(app.backButton)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.elementById(app.item6)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	item5: 'gT-19111-FocusOnLastItemFromBack_item5',
	item6: 'gT-19111-FocusOnLastItemFromBack_item6',
	backButton: 'gT-19111-FocusOnLastItemFromBack_button2'
};

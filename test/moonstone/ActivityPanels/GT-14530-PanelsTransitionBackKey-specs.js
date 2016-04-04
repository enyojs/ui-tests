var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ActivityPanels/GT-14530-PanelsTransitionBackKey',
	title = 'GT-14530 - BackKey: Panels Transition via BackKey in Pointer Mode ',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','BackKey','ActivityPanels'];	// Tags show up in SauceLabs test output

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

	it('should go back to previous state when back key is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.firstPanelItem)
			.click()
			.delay(1000)
			.elementById(app.secondPanelItem)
			.click()
			.delay(1000)
			.elementById(app.thirdPanel)
			.getAttribute('style').should.eventually.equal(app.panelShowingTransform)
			.keys(helpers.keys.Back)
			.delay(1000)
			.elementById(app.secondPanel)
			.getAttribute('style').should.eventually.equal(app.panelShowingTransform)
			.nodeify(done);
	});

});

app = {
	firstPanelItem: 'gT-14530-PanelsTransitionBackKey_item',
	secondPanelItem: 'gT-14530-PanelsTransitionBackKey_item20',
	secondPanel: 'gT-14530-PanelsTransitionBackKey_panel2',
	thirdPanel: 'gT-14530-PanelsTransitionBackKey_panel3',
	panelShowingTransform: 'transform: translateZ(0px);'
};

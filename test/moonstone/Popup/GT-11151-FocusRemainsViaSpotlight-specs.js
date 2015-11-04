var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',	
	path = 'test/moonstone/Popup/GT-11151-FocusRemainsViaSpotlight',
	title = 'GT-11151 - Popup: Focus remains in popup via Spotlight events',
	directory = 'ui-tests/dist',
	tags = ['popup', 'QA', 'moonstone'];	// Tags show up in SauceLabs test output

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
	it("Should focus on button in popup", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.buttonTapArea)
			.click()
			.delay(1000)
			.elementById(app.popupId)
			.getClasses().should.eventually.contain("showing")
			.keys(helpers.keys.SpotlightLeft)
			.elementById(app.helloButton)
			.getClasses().should.eventually.contain("spotlight")
			.elementById(app.scrim)
			.click()
			.delay(1000)
			.elementById(app.buttonTapArea)
			.click()
			.elementById(app.popupId)
			.delay(1000)
			.getClasses().should.eventually.contain("showing")
			.keys(helpers.keys.SpotlightLeft)
			.elementById(app.helloButton)
			.getClasses().should.eventually.contain("spotlight")
			.nodeify(done);
	});

});

app = {
	scrim: "scrim",
	buttonTapArea: "gT-11151-FocusRemainsViaSpotlight_button",
	popupId: "gT-11151-FocusRemainsViaSpotlight_buttonPopup",
	helloButton: "gT-11151-FocusRemainsViaSpotlight_button4"
};
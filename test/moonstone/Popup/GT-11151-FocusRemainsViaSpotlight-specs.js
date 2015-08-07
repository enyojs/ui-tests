var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Popup/GT-11151-FocusRemainsViaSpotlight',
	title = 'Popup: Focus remains in popup via Spotlight events',
	tags = ['popup', 'QA', 'moonstone'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it("Should focus on button in popup", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
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
	buttonTapArea: "app_button_tapArea",
	popupId: "app_buttonPopup",
	helloButton: "app_button4"
};

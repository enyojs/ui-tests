var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Popup/GT-10193-ContextualPopupDisabledSpotlight',
	title = 'GT-16935 ContextualPopup: Buttons Do Not Spot outside of SpotlightModal',
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

	it("Should not spotlight buttons when modal is active", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.appId)
			.moveTo()
			.elementById(app.modalButton)
			.click()
			.delay(1000)
			.enyoPropertyGet(app.popup, "style").should.eventually.not.contain("display: none;")
			.elementById(app.averageButton)
			.moveTo()
			.delay(1000)
			.getClasses().should.eventually.not.contain("spotlight")
			.enyoPropertyGet(app.popup, "style").should.eventually.not.contain("display: none;")
			.nodeify(done);
	});

});

app = {
	appId: "app",
	averageButton: "app_contextualPopupButton_tapArea",
	modalButton: "app_contextualPopupButton10_tapArea",
	popup: "app_buttonPopup"
};

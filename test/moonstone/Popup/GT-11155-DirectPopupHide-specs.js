var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Popup/GT-11155-DirectPopupHide',
	title = 'Popup: Direct Popup dismisses with Hide button',
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

	it("Should dismiss Direct Popup with hide button", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			//Click on Direct Popup to activate popup
			.waitForElementById(app.DirectPopUpButtonId)
			.elementById(app.DirectPopUpButtonId)
			.click()
			//Check that popup is showing
			.waitForElementById(app.DirectPopupId)
			.getClasses().should.eventually.contain('showing')
			//Click area above Popup
			.elementById(app.appLayer)
			.click()
			//Check that popup is showing
			.elementById(app.DirectPopupId)
			.getClasses().should.eventually.contain('showing')
			//Click to Hide Popup
			.elementById(app.HideDirectPopupButtonId)
			.click()
			//Verify the popup is hidden
			.elementById(app.DirectPopupId)
			.getClasses().should.not.eventually.contain('showing')
			.nodeify(done);
	});

});

app = {
	DirectPopUpButtonId: "app_button_tapArea",
	HideDirectPopupButtonId: "app_button2_tapArea",
	DirectPopupId: "app_directPopup",
	appLayer: "floatingLayer"
};

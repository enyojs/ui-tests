var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var url = 'http://localhost:3000/lib/moonstone/samples/PopupSample.html',
	title = 'GT-13891 5-way Select Unspottable Popup',
	tags = ['moonstone', 'spotlight','QA'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it("Should enable paging controls when available to scroll", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			// Wait for the app to load and render our element
			.waitForElementById(app.BasicPopupButtonId)
			// Select the first popup option using spotlight controls
			.keys(helpers.keys.SpotlightUp)
			.keys(helpers.keys.SpotlightSelect)
			// Verify the Popup is showing
			.elementById(app.PopupId)
				.getClasses().should.eventually.contain('showing', 'popup showing')
			// Send a select and verify that it does not cause the popup to close
			.keys(helpers.keys.SpotlightSelect)
			.elementById(app.PopupId)
				.getClasses().should.eventually.contain('showing', 'popup still showing')
			.nodeify(done);
	});

});

app = {
	BasicPopupButtonId: 'popupSample_button',
	PopupId: 'popupSample_basicPopup'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Popup/GT-13891-SelectUnspottablePopup',
	title = 'GT-13891 - 5-way Select Unspottable Popup',	// Title shows up in test output
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'spotlight','QA'];	// Tags show up in SauceLabs test output

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

	it('Should not dismiss Popup on Spotlight select', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
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
	BasicPopupButtonId: 'gT-13891-SelectUnspottablePopup_button_client',
	PopupId: 'gT-13891-SelectUnspottablePopup_basicPopup'
};
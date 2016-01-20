var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Popup/GT-10193-ContextualPopupDisabledSpotlight',
	title = 'GT-10193 - ContextualPopup: Buttons Do Not Spot outside of SpotlightModal',
	directory = 'ui-tests/dist',
	tags = ['popup', 'QA', 'moonstone','P2'];	// Tags show up in SauceLabs test output

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

	it('Should not spotlight buttons when modal is active', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.moveTo()
			.elementById(app.modalButton)
			.click()
			.delay(1000)
			.enyoPropertyGet(app.popup, 'style').should.eventually.not.contain('display: none;')
			.elementById(app.averageButton)
			.moveTo()
			.delay(1000)
			.getClasses().should.eventually.not.contain('spotlight')
			.enyoPropertyGet(app.popup, 'style').should.eventually.not.contain('display: none;')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-10193-ContextualPopupDisabledSpotlight',
	averageButton: 'gT-10193-ContextualPopupDisabledSpotlight_contextualPopupButton_client',
	modalButton: 'gT-10193-ContextualPopupDisabledSpotlight_contextualPopupButton10_client',
	popup: 'gT-10193-ContextualPopupDisabledSpotlight_buttonPopup'
};

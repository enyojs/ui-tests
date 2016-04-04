var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Popup/GT-11155-DirectPopupHide',
	title = 'GT-11155 - Popup: Direct Popup dismisses with Hide button',
	directory = 'ui-tests/dist',
	tags = ['popup', 'QA', 'moonstone'];	// Tags show up in SauceLabs test output

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

	it('Should dismiss Direct Popup with hide button', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
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
	DirectPopUpButtonId: 'gT-11155-DirectPopupHide_button',
	HideDirectPopupButtonId: 'gT-11155-DirectPopupHide_button2',
	DirectPopupId: 'gT-11155-DirectPopupHide_directPopup',
	appLayer: 'floatingLayer'
};
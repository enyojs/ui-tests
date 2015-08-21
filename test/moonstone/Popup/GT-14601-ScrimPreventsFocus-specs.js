var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Popup/GT-14601-ScrimPreventsFocus',
	title = 'Popup: Scrim prevents Focus events',
	directory = 'ui-tests/dist',
	tags = ['scrim','moonstone','qa','popup'];	// Tags show up in SauceLabs test output

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

	it('should prevent focus when scrim is active' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.scrollerButton)
			// .click()
			// .elementById(app.scrollerPopup)
			// .getClasses().should.eventually.contain('showing')
			//move three times to force spotlight
			.elementById(app.buttonInPopupButton)
			.moveTo()
			.moveTo(10,10)
			.moveTo(20,20)
			.delay(1000)
			.elementById(app.buttonInPopupButton)
			.getClasses().should.eventually.not.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14601-ScrimPreventsFocus',
	scrollerButton: 'gT-14601-ScrimPreventsFocus_button4',
	scrollerPopup: 'gT-14601-ScrimPreventsFocus_scrollerPopup',
	longPopupButton: 'gT-14601-ScrimPreventsFocus_button3',
	buttonInPopupButton: 'gT-14601-ScrimPreventsFocus_button5'
};
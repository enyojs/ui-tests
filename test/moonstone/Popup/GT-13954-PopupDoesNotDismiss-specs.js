var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Popup/GT-13954-PopupDoesNotDismiss',
	title = 'GT-13954 - ContextualPopup: Popup Does Not Dismiss with RadioItem Selection',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ContextualPopup','Popup'];	// Tags show up in SauceLabs test output

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

	it('should not dismiss popup when radio item is pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.buttonTapArea)
			.click()
			.delay(1000)
			.elementById(app.nestedRadioPopup)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.nestedRadioValue)
			.text().should.eventually.contain('Creek')
			.elementById(app.riverRadioButton)
			.click()
			.delay(1000)
			.elementById(app.nestedRadioValue)
			.text().should.eventually.contain('River')
			.elementById(app.nestedRadioPopup)
			.getComputedCss('display').should.eventually.not.equal('none')
			.nodeify(done);
	});

});

app = {
	buttonTapArea: 'gT-13954-PopupDoesNotDismiss_button3',
	riverRadioButton: 'gT-13954-PopupDoesNotDismiss_radioItem2',
	nestedRadioValue: 'gT-13954-PopupDoesNotDismiss_nestedRadioValue',
	nestedRadioPopup: 'gT-13954-PopupDoesNotDismiss_nestedRadioPopup'
};

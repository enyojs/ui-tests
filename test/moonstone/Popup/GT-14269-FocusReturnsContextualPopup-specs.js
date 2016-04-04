var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Popup/GT-14269-FocusReturnsContextualPopup',
	title = 'GT-14269 - BackKey: Focus returns to Parent in ContextualPopup',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','BackKey','ContextualPopup'];	// Tags show up in SauceLabs test output

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

	it('should return focus to parent after back key', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys([helpers.keys.SpotlightRight, helpers.keys.SpotlightRight, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.elementById(app.rightButtonId)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.elementById(app.rightButtonPopup)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.rightButtonId)
			.getClasses().should.eventually.not.contain('spotlight')
			.keys(helpers.keys.Back)
			.elementById(app.rightButtonPopup)
			.getComputedCss('display').should.eventually.equal('none')
			.elementById(app.rightButtonId)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14269-FocusReturnsContextualPopup',
	rightButtonId: 'gT-14269-FocusReturnsContextualPopup_button5',
	rightButtonPopup: 'gT-14269-FocusReturnsContextualPopup_contextualPopup4'
};
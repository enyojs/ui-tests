var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/garnet/ConfirmPanel/QW-5701-FingerSticksToPanel',
	title = 'QW-5701 - ConfirmPanel: Finger Sticks to Panel',
	directory = 'ui-tests/dist',
	tags = ['garnet','ConfirmPanel'];	// Tags show up in SauceLabs test output

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

	it('should have panel stick to where finger is' , function (done) {
		browser
			.setWindowSize(400,400)
			.get(directory)
			.buttonUp()
			.waitForElementById(app.button4)
			.click()
			.elementById(app.fvm)
			.moveTo(0,150)
			.buttonDown()
			.elementById(app.fvm)
			.moveTo(150,150)
			.delay(2000)
			.elementById(app.fvm)
			.getClasses().should.eventually.contain('dragging')
			.buttonUp()
			.nodeify(done);
	});

});

app = {
	button4: 'qW-5701-FingerSticksToPanel_fixedFloating_view1_button4',
	fvm: 'qW-5701-FingerSticksToPanel_fixedFloating__fvm'
};
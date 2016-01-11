var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/garnet/ConfirmPanel/QW-5703-PanelReleaseAfterStick',
	title = 'QW-5703 - ConfirmPanel: Panel Releases After Stick',
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

	it('should release after stick' , function (done) {
		browser
			.setWindowSize(400,400)
			.get(directory)
			.buttonUp()
			.waitForElementById(app.button4)
			.click()
			.elementById(app.fvm)
			.moveTo(0,150)
			.buttonDown()
			.delay(1000)
			.elementById(app.fvm)
			.moveTo(200,150)
			.delay(2000)
			.elementById(app.fvm)
			.getClasses().should.eventually.contain('dragging')
			.buttonUp()
			.delay(2000)
			.elementByIdOrNull(app.fvm)
			.should.eventually.equal(null)
			.nodeify(done);
	});

});

app = {
	button4: 'qW-5703-PanelReleaseAfterStick_fixedFloating_view1_button4',
	fvm: 'qW-5703-PanelReleaseAfterStick_fixedFloating__fvm'
};

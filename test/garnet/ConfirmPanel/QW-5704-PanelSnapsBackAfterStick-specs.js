var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/garnet/ConfirmPanel/QW-5704-PanelSnapsBackAfterStick',
	title = 'QW-5704 - ConfirmPanel: Panel Snaps Back After Stick',
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

	it('should snap back after stick' , function (done) {
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
			.moveTo(140,150)
			.delay(2000)
			.elementById(app.fvm)
			.getClasses().should.eventually.contain('dragging')
			.buttonUp()
			.elementByIdOrNull(app.fvm)
			.should.eventually.not.equal(null)
			.elementById(app.fvm)
			.getClasses().should.eventually.not.contain('dragging')
			.nodeify(done);
	});

});

app = {
	button4: 'qW-5704-PanelSnapsBackAfterStick_fixedFloating_view1_button4',
	fvm: 'qW-5704-PanelSnapsBackAfterStick_fixedFloating__fvm'
};

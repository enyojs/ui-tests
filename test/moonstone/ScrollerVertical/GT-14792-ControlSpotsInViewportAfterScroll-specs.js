var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ScrollerVertical/GT-14792-ControlSpotsInViewportAfterScroll',
	title = 'GT-14792 - PageUp/Down: Control Spots in Viewport after Scroll',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ScrollerVertical','PageUp','PageDown'];	// Tags show up in SauceLabs test output

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

	it('should show spotlight on item after page up and down' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.expandablePicker)
			.moveTo(0,0)
			.moveTo(10,10)
			.moveTo()
			.elementById(app.expandablePicker)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.Pagedown)
			.delay(400)
			.keys(helpers.keys.Pagedown)
			.delay(400)
			.elementById(app.formCheckbox)
			.moveTo(0, 0)
			.moveTo()
			.getClasses().should.eventually.contain('spotlight')
			.elementsByClassName('spotlight').should.eventually.have.length(1)
			.nodeify(done);
	});

});

app = {
	expandablePicker: 'gT-14792-ControlSpotsInViewportAfterScroll_expandablePicker_header',
	formCheckbox: 'gT-14792-ControlSpotsInViewportAfterScroll_formCheckbox'
};

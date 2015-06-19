var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Tooltip/GT-13617-TooltipButtonDoesntBlink',
	title = 'Tooltip: Button Does Not Blink when Hovering Vertically',
	tags = ['moonstone', 'tooltip', 'qa'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('Should not blink when cursor is moving up and down within button', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.rightButton)
			.elementById(app.rightTooltip)
			.moveTo(0,0)
			.elementById(app.rightButton)
			.moveTo(0,0)
			.delay(1000)
			.enyoPropertyGet(app.rightTooltip, 'style').should.eventually.not.contain("display: none;")
			.elementById(app.rightButton)
			.moveTo(0,-5)
			.elementById(app.rightButton)
				.getClasses().should.eventually.contain('spotlight')
			.elementById(app.rightButton)
			.moveTo(0,10)
			.elementById(app.rightButton)
				.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	rightButton: "app_button2",
	rightTooltip: "app_toolTip"
};

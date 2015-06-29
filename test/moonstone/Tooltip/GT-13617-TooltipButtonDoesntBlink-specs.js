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
			.moveTo(null, 100,100)
			.moveTo(null, 200,200)
			.elementById(app.rightButton)
			.moveTo()
			.delay(1000)
			.enyoPropertyGet(app.rightTooltip, 'style').should.eventually.not.contain("display: none;")

			.elementById(app.rightButton)
			.moveTo(150,80)
			.delay(1000)
			.enyoPropertyGet(app.rightTooltip, 'style').should.eventually.not.contain("display: none;")


			.elementById(app.rightButton)
			.moveTo(100,20)
			.delay(1000)
			.enyoPropertyGet(app.rightTooltip, 'style').should.eventually.not.contain("display: none;")

			.nodeify(done);
	});

});

app = {
	rightButton: "app_button",
	rightTooltip: "app_toolTip",
	appID: "app",
	appControl: "app_control"
};

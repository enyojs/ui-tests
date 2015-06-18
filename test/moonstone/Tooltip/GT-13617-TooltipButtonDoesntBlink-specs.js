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

	it('Should not loop hours while the minute picker loops', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)

			.nodeify(done);
	});

});

app = {

};

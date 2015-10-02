var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Tooltip/GT-11235-StillDisplayAfterPointerTimeout',
	title = 'Tooltip: Tooltip Displays after Pointer Times Out',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'tooltip', 'qa'];	// Tags show up in SauceLabs test output

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

	it('Should have tooltip remain after pointer timeout', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			//extra move for spotlight in chrome
			.moveTo(null, 100,100)
			.moveTo(null, 200,200)
			.elementById(app.rightButton)
			.moveTo()
			.delay(1000)
			.enyoPropertyGet(app.rightTooltip, 'style').should.eventually.not.contain('display: none;')
			.elementById(app.rightButton)
			//wait for cursor to time out on webOS. 
			.delay(10000)
			.enyoPropertyGet(app.rightTooltip, 'style').should.eventually.not.contain('display: none;')
			.nodeify(done);
	});

});

app = {
	rightButton: 'gT-11235-StillDisplayAfterPointerTimeout_button',
	rightTooltip: 'gT-11235-StillDisplayAfterPointerTimeout_toolTip',
};

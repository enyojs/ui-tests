var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Tooltip/GT-11235-StillDisplayAfterPointerTimeout',
	title = 'GT-11235 - Tooltip: Tooltip Displays after Pointer Times Out',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'tooltip', 'qa'];	// Tags show up in SauceLabs test output

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

	it('Should have tooltip remain after pointer timeout', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.rightButton)
			.moveTo(0,0)
			.moveTo(10, 10)
			.moveTo()
			.delay(1000)
			.elementById(app.rightTooltip)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.rightButton)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.appId)
			.delay(2000)
			.moveTo()
			.elementById(app.rightTooltip)
			.getComputedCss('display').should.eventually.equal('none')
			.elementById(app.rightButton)
			.getClasses().should.eventually.not.contain('spotlight')
			//wait for cursor to time out on webOS.
			.elementById(app.appId)
			.delay(12000)
			.elementById(app.rightTooltip)
			.getComputedCss('display').should.eventually.not.equal('none')
			.elementById(app.rightButton)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-11235-StillDisplayAfterPointerTimeout',
	rightButton: 'gT-11235-StillDisplayAfterPointerTimeout_button',
	rightTooltip: 'gT-11235-StillDisplayAfterPointerTimeout_toolTip',
};

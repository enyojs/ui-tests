var helpers = rootRequire('./helpers'),
	app = {};

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/ListAction/GT-16924-ScrollThumbOnWheel',
	title = 'ListActions: Scroll Thumb Displays upon Wheeling',
	tags = ['moonstone', 'qa', 'list', 'list action', 'scroll'];	// Tags show up in SauceLabs test output

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

	//scroll only implemented in webOS
	it("should show scroll thumb", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.autoCollapseIcon)
			.click()
			.delay(2000)
			.elementById(app.scrollPort)
			.moveTo()
			.mousewheel(-1000)
			.elementById(app.scrollThumb)
			.getClasses().should.eventually.not.contain("hidden")			
			.nodeify(done);
	});
});

app = {
	appID: 'app',
	autoCollapseIcon: "app_listActions3_activator_tapArea",
	scrollPort: "app_scroller4_strategy_viewport",
	scrollThumb: "app_scroller4_strategy_vthumb"
};

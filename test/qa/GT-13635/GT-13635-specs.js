var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'lib/moonstone/samples/Sample.html?DataGridListSample',
	title = 'GT-13635 DataGridList Paging Controls',
	tags = ['moonstone', 'DataGridList','QA'];	// Tags show up in SauceLabs test output

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

	it("Should enable paging controls when available to scroll", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			// Wait for the app to load and render our element (returns the element)
			.waitForElementById(app.PageUpControlId, 6000)
			// Verify that our PageUp Control is disabled when we're at the top of the scroller
				.getClasses().should.eventually.contain('disabled', 'Starts disabled')
			.waitForElementById("app_gridSampleItem", 6000)
			// Move down the page, causing scroll
			.keys(helpers.keys.SpotlightRight)
			.delay(200)
			.keys(helpers.keys.SpotlightRight)
			.delay(200)
			.keys(helpers.keys.SpotlightDown)
			.delay(200)
			.keys(helpers.keys.SpotlightDown)
			.delay(200)
			.keys(helpers.keys.SpotlightDown)
			// Verify the PageUp Control is now enabled (doesn't have disabled class)
			.elementById(app.PageUpControlId)
				.getClasses().should.not.eventually.contain('disabled', 'Ends enabled')
			.nodeify(done);
	});

});

app = {
	PageUpControlId: "app_gridList_scroller_strategy_pageUpControl",
	FirstGridListItemId: 'app_gridSampleItem'
};

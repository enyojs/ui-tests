var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var url = 'http://localhost:3000/lib/moonstone/samples/DataGridListSample.html',
	title = 'GT-13635 DataGridList Paging Controls',
	tags = ['moonstone', 'DataGridList','QA'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, done);
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
			.waitForElementById(app.PageUpControlId)
			// Verify that our PageUp Control is disabled when we're at the top of the scroller
				.getClasses().should.eventually.contain('disabled', 'Starts disabled')
			// Get spotlight into the gridlist by clicking an item in it
			.elementById(app.FirstGridListItemId)
				.click()
			// Move down the page, causing scroll
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			// Verify the PageUp Control is now enabled (doesn't have disabled class)
			.elementById(app.PageUpControlId)
				.getClasses().should.not.eventually.contain('disabled', 'Ends enabled')
			.nodeify(done);
	});

});

app = {
	PageUpControlId: "dataGridListSample_gridList_scroller_strategy_pageUpControl",
	FirstGridListItemId: 'dataGridListSample_gridSampleItem'
};

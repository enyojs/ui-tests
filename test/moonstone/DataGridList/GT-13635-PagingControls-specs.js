var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DataGridList/GT-13635-PagingControls',
	title = 'GT-13635 - DataGridList Paging Controls',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'DataGridList','QA','P2'];	// Tags show up in SauceLabs test output

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

	it('Should enable paging controls when available to scroll', function (done) {browser
			.setWindowSize(1920,1280)
			.get(directory)
			// Wait for the app to load and render our element (returns the element)
			.waitForElementById(app.PageUpControlId, 6000)
			// Verify that our PageUp Control is disabled when we're at the top of the scroller
				.getClasses().should.eventually.contain('disabled', 'Starts disabled')
			.waitForElementById(app.FirstGridListItemId, 6000)
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
	PageUpControlId: 'gT-13635-PagingControls_gridList_scroller_strategy_pageUpControl',
	FirstGridListItemId: 'gT-13635-PagingControls_gridSampleItem'
};
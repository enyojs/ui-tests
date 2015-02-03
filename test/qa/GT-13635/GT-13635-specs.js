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
			.waitForElementById(app.PageUpControlId)
			.elementById(app.PageUpControlId)
				.getClasses().should.eventually.contain('disabled', 'Starts disabled')
			.elementById(app.FirstGridListItemId)
				.click()
			.keys(helpers.wd.SPECIAL_KEYS['Down arrow'])
			.keys(helpers.wd.SPECIAL_KEYS['Down arrow'])
			.keys(helpers.wd.SPECIAL_KEYS['Down arrow'])
			.elementById(app.PageUpControlId)
				.getClasses().should.not.eventually.contain('disabled', 'Ends enabled')
			.nodeify(done);
	});

});

app = {
	PageUpControlId: "dataGridListSample_gridList_scroller_strategy_pageUpControl",
	FirstGridListItemId: 'dataGridListSample_gridSampleItem'
};

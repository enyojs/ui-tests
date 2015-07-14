var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Panel/GT-16934-AlwaysViewingCollapsingPanels',
	title = 'GT-16934 AlwaysViewingPanels - Collapsing Panels',
	tags = ['popup', 'QA', 'moonstone'];	// Tags show up in SauceLabs test output

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

	it("Should dismiss Direct Popup with hide button", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)

			.nodeify(done);
	});

});

app = {
	panel1Item: "app_item",
	panel2Item: "app_item6",
	panel3Item: "app_item11",
	panel4Item: "app_item16",
	panel5Item: "app_item21",
	panel6Item: "app_item26",
	panel1Breadcrumb:"app_panel1_breadcrumbTitleAbove",
	panel2Breadcrumb:"app_panel2_breadcrumbTitleAbove",
	panel3Breadcrumb:"app_panel3_breadcrumbTitleAbove",
	panel4Breadcrumb:"app_panel4_breadcrumbTitleAbove",
	panel5Breadcrumb:"app_panel5_breadcrumbTitleAbove",
	panel6Breadcrumb:"app_panel6_breadcrumbTitleAbove",
};

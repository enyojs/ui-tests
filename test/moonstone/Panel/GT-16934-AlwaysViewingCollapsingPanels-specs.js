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
			.waitForElementById(app.panel1Item)
			.click()
			.delay(1000)
			.elementById(app.panel1)
			.getClasses().should.eventually.contain("shrunken")


			.elementById(app.panel2Item)
			.click()
			.delay(1000)
			.elementById(app.panel2)
			.getClasses().should.eventually.contain("shrunken")

			.elementById(app.panel3Item)
			.click()
			.delay(1000)
			.elementById(app.panel3)
			.getClasses().should.eventually.contain("shrunken")

			.elementById(app.panel4Item)
			.click()
			.delay(1000)
			.elementById(app.panel4)
			.getClasses().should.eventually.contain("shrunken")

			.elementById(app.panel5Item)
			.click()
			.delay(1000)
			.elementById(app.panel5)
			.getClasses().should.eventually.contain("shrunken")

			.elementById(app.panel6Item)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.contain("shrunken")

			.elementById(app.panel6Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain("shrunken")

			.elementById(app.panel5Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain("shrunken")

			.elementById(app.panel4Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain("shrunken")

			.elementById(app.panel3Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain("shrunken")

			.elementById(app.panel2Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain("shrunken")

			.elementById(app.panel1Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain("shrunken")

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
	panel1:"app_panel",
	panel2:"app_panel2",
	panel3:"app_panel3",
	panel4:"app_panel4",
	panel5:"app_panel5",
	panel6:"app_panel6",
	panel1Breadcrumb:"app_panel_breadcrumb",
	panel2Breadcrumb:"app_panel2_breadcrumb",
	panel3Breadcrumb:"app_panel3_breadcrumb",
	panel4Breadcrumb:"app_panel4_breadcrumb",
	panel5Breadcrumb:"app_panel5_breadcrumb",
	panel6Breadcrumb:"app_panel6_breadcrumb",
};

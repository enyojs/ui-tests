var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Panel/GT-11044-AlwaysViewingCollapsingPanels',
	title = 'AlwaysViewingPanels - Collapsing Panels',
	directory = 'ui-tests/dist',
	tags = ['popup', 'QA', 'moonstone'];	// Tags show up in SauceLabs test output

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

	it('Should collapse and uncollapes panels', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.panel1Item)
			.click()
			.delay(1000)
			.elementById(app.panel1Breadcrumb)
			.getAttribute('style').should.eventually.contain('transform')
			.elementById(app.panel2Item)
			.click()
			.delay(1000)
			.elementById(app.panel2Breadcrumb)
			.getAttribute('style').should.eventually.contain('transform')
			.elementById(app.panel3Item)
			.click()
			.delay(1000)
			.elementById(app.panel3Breadcrumb)
			.getAttribute('style').should.eventually.contain('transform')
			.elementById(app.panel4Item)
			.click()
			.delay(1000)
			.elementById(app.panel4Breadcrumb)
			.getAttribute('style').should.eventually.contain('transform')
			.elementById(app.panel5Item)
			.click()
			.delay(1000)
			.elementById(app.panel5Breadcrumb)
			.getAttribute('style').should.eventually.contain('transform')
			.elementById(app.panel6Item)
			.click()
			.delay(1000)
			.elementById(app.panel6Breadcrumb)
			.getAttribute('style').should.eventually.contain('transform')
			.elementById(app.panel6Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6Breadcrumb)
			.getAttribute('style').should.eventually.not.contain('transform')
			.elementById(app.panel5Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel5Breadcrumb)
			.getAttribute('style').should.eventually.not.contain('transform')
			.elementById(app.panel4Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel4Breadcrumb)
			.getAttribute('style').should.eventually.not.contain('transform')
			.elementById(app.panel3Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel3Breadcrumb)
			.getAttribute('style').should.eventually.not.contain('transform')
			.elementById(app.panel2Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel2Breadcrumb)
			.getAttribute('style').should.eventually.not.contain('transform')
			.elementById(app.panel1Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel1Breadcrumb)
			.getAttribute('style').should.eventually.not.contain('transform')
			.nodeify(done);
	});
});

app = {
	panel1Item: 'gT-11044-AlwaysViewingCollapsingPanels_item',
	panel2Item: 'gT-11044-AlwaysViewingCollapsingPanels_item6',
	panel3Item: 'gT-11044-AlwaysViewingCollapsingPanels_item11',
	panel4Item: 'gT-11044-AlwaysViewingCollapsingPanels_item16',
	panel5Item: 'gT-11044-AlwaysViewingCollapsingPanels_item21',
	panel6Item: 'gT-11044-AlwaysViewingCollapsingPanels_item26',
	panel1:'gT-11044-AlwaysViewingCollapsingPanels_panel',
	panel2:'gT-11044-AlwaysViewingCollapsingPanels_panel2',
	panel3:'gT-11044-AlwaysViewingCollapsingPanels_panel3',
	panel4:'gT-11044-AlwaysViewingCollapsingPanels_panel4',
	panel5:'gT-11044-AlwaysViewingCollapsingPanels_panel5',
	panel6:'gT-11044-AlwaysViewingCollapsingPanels_panel6',
	panel1Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panels_breadcrumb',
	panel2Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panels_breadcrumb2',
	panel3Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panels_breadcrumb3',
	panel4Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panels_breadcrumb4',
	panel5Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panels_breadcrumb5',
	panel6Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panels_breadcrumb6',
};

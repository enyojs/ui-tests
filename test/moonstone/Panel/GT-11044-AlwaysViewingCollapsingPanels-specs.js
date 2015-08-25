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
		helpers.epack(path);
		browser = helpers.initBrowser(title, tags, base, done);
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
			.elementById(app.panel1)
			.getClasses().should.eventually.contain('shrunken')
			.elementById(app.panel2Item)
			.click()
			.delay(1000)
			.elementById(app.panel2)
			.getClasses().should.eventually.contain('shrunken')
			.elementById(app.panel3Item)
			.click()
			.delay(1000)
			.elementById(app.panel3)
			.getClasses().should.eventually.contain('shrunken')
			.elementById(app.panel4Item)
			.click()
			.delay(1000)
			.elementById(app.panel4)
			.getClasses().should.eventually.contain('shrunken')
			.elementById(app.panel5Item)
			.click()
			.delay(1000)
			.elementById(app.panel5)
			.getClasses().should.eventually.contain('shrunken')
			.elementById(app.panel6Item)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.contain('shrunken')
			.elementById(app.panel6Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain('shrunken')
			.elementById(app.panel5Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain('shrunken')
			.elementById(app.panel4Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain('shrunken')
			.elementById(app.panel3Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain('shrunken')
			.elementById(app.panel2Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain('shrunken')
			.elementById(app.panel1Breadcrumb)
			.click()
			.delay(1000)
			.elementById(app.panel6)
			.getClasses().should.eventually.not.contain('shrunken')
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
	panel1Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panel_breadcrumb',
	panel2Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panel2_breadcrumb',
	panel3Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panel3_breadcrumb',
	panel4Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panel4_breadcrumb',
	panel5Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panel5_breadcrumb',
	panel6Breadcrumb:'gT-11044-AlwaysViewingCollapsingPanels_panel6_breadcrumb',
};

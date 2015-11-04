var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandableListItem/GT-17041-GroupedListOnlyOneExpanded',
	title = 'GT-17041 - ExpandableListItem: List Collapses/Expands in Grouped Lists',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'ExpandableListItem', 'qa', 'grouped lists'];	// Tags show up in SauceLabs test output

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

	it('Should only have one expanded list', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.yetGroup)
			.scrollIntoView()
			.elementById(app.expandedGroup)
			.getClasses().should.eventually.contain('open')
			.elementById(app.yetGroup)
			.click()
			//delay to wait for group to open
			.delay(1000)
			.elementById(app.yetGroup)
			.getClasses().should.eventually.contain('open')
			.elementById(app.expandedGroup)
			.getClasses().should.eventually.not.contain('open')
			.elementById(app.anotherGroup)
			.click()
			.elementById(app.anotherGroup)
			.getClasses().should.eventually.contain('open')
			.elementById(app.yetGroup)
			.getClasses().should.eventually.not.contain('open')
			.nodeify(done);
	});

});

app = {
	expandedGroup: 'gT-17041-GroupedListOnlyOneExpanded_expandableListItem6',
	anotherGroup: 'gT-17041-GroupedListOnlyOneExpanded_expandableListItem7',
	yetGroup: 'gT-17041-GroupedListOnlyOneExpanded_expandableListItem8'
};
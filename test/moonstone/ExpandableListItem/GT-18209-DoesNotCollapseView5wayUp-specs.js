var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandableListItem/GT-18209-DoesNotCollapseView5wayUp',
	title = 'GT-18209 - ExpandableListItem: List Does Not Collapse via 5way Up',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ExpandableListItem','5way'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		helpers.epack(path, function(){
			browser = helpers.initBrowser(title, tags, base, path, done);
		});
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should not collapse on 5way up' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.expandableListItemHeader)
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.expandableListItemHeader)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.elementById(app.expandableListItem)
			.getClasses().should.eventually.contain('open')
			.keys(helpers.keys.SpotlightUp)
			.elementById(app.expandableListItem)
			.getClasses().should.eventually.contain('open')
			.elementById(app.expandableListItemHeader)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.console)
			.text().should.eventually.contain('open')
			.nodeify(done);
	});

});

app = {
	expandableListItem: 'gT-18209-DoesNotCollapseView5wayUp_expandableListItem',
	expandableListItemHeader: 'gT-18209-DoesNotCollapseView5wayUp_expandableListItem_header',
	console: 'gT-18209-DoesNotCollapseView5wayUp_console'
};

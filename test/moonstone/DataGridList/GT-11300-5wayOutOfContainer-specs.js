var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/DataGridList/GT-11300-5wayOutOfContainer',
	title = 'GT-11300 - DataGridList: 5way Out of a Container',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DataGridList','P2'];	// Tags show up in SauceLabs test output

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

	it('should 5way out of container to nearest element' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.gridListID)
			.keys(helpers.keys.SpotlightLeft)
			.delay(500)
			.elementById(app.selectionButton)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.firstImageId)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)			
			.elementById(app.image8)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightUp)
			.delay(500)			
			.elementByClassName('spotlight')
			.getClasses().should.eventually.contain('moon-large-button-text')
			.nodeify(done);
	});

});

app = {
	selectionButton: 'gT-11300-5wayOutOfContainer_selectionToggle',
	firstImageId: 'gT-11300-5wayOutOfContainer_gridSampleItem',
	image8: 'gT-11300-5wayOutOfContainer_gridSampleItem8',
	popupButtonId: 'gT-11300-5wayOutOfContainer_contextualPopupButton4',
	gridListID: 'gT-11300-5wayOutOfContainer_gridList_active'
};

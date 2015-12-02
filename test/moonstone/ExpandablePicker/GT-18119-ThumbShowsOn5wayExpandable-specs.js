var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandablePicker/GT-18119-ThumbShowsOn5wayExpandable',
	title = 'GT-18119 - ExpandablePicker: Scroll Thumb Displays with 5way',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ExpandablePicker'];	// Tags show up in SauceLabs test output

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

	it('should display scroll thumb when using the 5way' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.expandablePicker)
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.expandablePickerHeader)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.elementById(app.expandablePicker)
			.getClasses().should.eventually.contain('open')
			.elementById(app.checkboxItem)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.vThumb)
			.getClasses().should.eventually.not.contain('hidden')
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.checkboxItem7)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	expandablePicker:'gT-18119-ThumbShowsOn5wayExpandable_expandablePicker',
	expandablePickerHeader:'gT-18119-ThumbShowsOn5wayExpandable_expandablePicker_header',
	checkboxItem: 'gT-18119-ThumbShowsOn5wayExpandable_checkboxItem',
	checkboxItem7: 'gT-18119-ThumbShowsOn5wayExpandable_checkboxItem7',
	vThumb: 'gT-18119-ThumbShowsOn5wayExpandable_scroller_strategy_vthumb'
};

var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandablePicker/GT-18154-FocusSpotsOnParentOnCollapse',
	title = 'ExpandablePicker: Focus Spots Parent when Integer Picker collapses',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Integer Picker'];	// Tags show up in SauceLabs test output

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

	it('should focus on parent when integer picker collapses' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.pickerHeader)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.elementById(app.pickerChild)
			.getClasses().should.eventually.contain('spotlight')
			.keys(helpers.keys.SpotlightSelect)
			.delay(500)
			.elementById(app.pickerHeader)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-18154-FocusSpotsOnParentOnCollapse',
	pickerHeader: 'gT-18154-FocusSpotsOnParentOnCollapse_expandableIntegerPicker_header',
	pickerChild: 'gT-18154-FocusSpotsOnParentOnCollapse_expandableIntegerPicker_picker'
};
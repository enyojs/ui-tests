var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Slider/GT-18124-PopupDisplaysThroughout5way',
	title = 'Slider: Slider Indicator Popup Displays Throughout with 5way',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','slider','tooltip','popup'];	// Tags show up in SauceLabs test output

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

	it('should display popup when 5way is active' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightSelect])
			.elementById(app.popupLabel)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightUp)
			.delay(500)
			.elementById(app.popupLabel)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightUp)
			.delay(500)
			.elementById(app.popupLabel)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys([helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp, helpers.keys.SpotlightUp])
			.elementById(app.popupLabel)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.popupLabel)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.popupLabel)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys([helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown, helpers.keys.SpotlightDown])
			.elementById(app.popupLabel)
			.getComputedCss('display').should.eventually.not.equal('none')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-18124-PopupDisplaysThroughout5way',
	popupLabel: 'gT-18124-PopupDisplaysThroughout5way_slider8_popup'
};
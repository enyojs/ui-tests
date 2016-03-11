var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ToggleItem/GT-14672-KnobColorRemainsOnHover',
	title = 'GT-14672 - ToggleItem: Knob Color remains the same upon Hover',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'knob', 'qa', 'ToggleItem'];	// Tags show up in SauceLabs test output

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

	it('Should have knob remain the same color', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.moveTo()
			.elementById(app.groupOption1icon)
			.getComputedCss('color').should.eventually.contain(app.untoggledColor)
			//need to add this move to work in chrome
			.elementById(app.disabledOption)
			.moveTo()
			.elementById(app.groupOption1Client)
			.moveTo()
			.elementById(app.groupOption1)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.groupOption1icon)
			.getComputedCss('color').should.eventually.contain(app.untoggledColor)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14672-KnobColorRemainsOnHover',
	groupOption1: 'gT-14672-KnobColorRemainsOnHover_toggleItem7',
	groupOption1Client: 'gT-14672-KnobColorRemainsOnHover_toggleItem7_client',
	groupOption1icon: 'gT-14672-KnobColorRemainsOnHover_toggleItem7_input_checkboxIcon',
	disabledOption: 'gT-14672-KnobColorRemainsOnHover_toggleItem9',
	//chrome and webOS represent colors differently. instead just check for the rgb numbers
	untoggledColor: '190, 190, 190'
};
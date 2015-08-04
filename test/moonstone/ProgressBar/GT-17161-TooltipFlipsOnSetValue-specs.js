var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ProgressBar/GT-17161-TooltipFlipsOnSetValue',
	title = 'Progress: Tooltip flips direction when Setting Value',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Progress Bar'];	// Tags show up in SauceLabs test output

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

	it('Should flip tooltip when value crosses 50%' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.enyoPropertyGet(app.animationChecked, 'checked').should.eventually.equal(true)
			.elementById(app.plusButton)
			.click()
			.click()
			.click()
			.click()
			.click()
			.click()
			.click()
			.click()
			.click()
			.click()
			.click()
			.delay(2000)
			.elementById(app.popupTooltip)
			.getClasses().should.eventually.contain(app.flipClass)
			.enyoPropertySet(app.valueInput, 'value', '49')
			.elementById(app.setValueButton)
			.click()
			.delay(2000)
			.elementById(app.popupTooltip)
			.getClasses().should.eventually.not.contain(app.flipClass)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-17161-TooltipFlipsOnSetValue',
	animationChecked: 'gT-17161-TooltipFlipsOnSetValue_animateSetting_input',
	plusButton: 'gT-17161-TooltipFlipsOnSetValue_button3',
	valueInput: 'gT-17161-TooltipFlipsOnSetValue_input',
	setValueButton: 'gT-17161-TooltipFlipsOnSetValue_button',
	popupTooltip: 'gT-17161-TooltipFlipsOnSetValue_progressBar5_popup',
	flipClass: 'moon-progress-bar-popup-flip-h'
};
var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Tooltip/GT-11069-TooltipChangesDirectionSlider',
	title = 'Tooltip: Slider-Tooltip Direction Changes from Drag',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'slider', 'tooltip'];	// Tags show up in SauceLabs test output

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

	it('should change tooltip direction', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.knobId)
			.moveTo()
			.buttonDown()
			.elementById(app.sliderPopup)
			.getAttribute('style').should.eventually.not.contain('display: none;')
			.elementById(app.sliderPopup).text().should.eventually.equal('25')
			.elementById(app.sliderId)
			.moveTo(1000,20)
			.buttonDown()
			.buttonUp()
			.delay(1000)
			.elementById(app.knobId)
			.moveTo()
			.buttonDown()
			//make sure tooltip displays
			.elementById(app.tooltipId)
			.getClasses().should.eventually.contain(app.flipClass)
			.elementById(app.sliderPopup)
			.getAttribute('style').should.eventually.not.contain('display: none;')
			.elementById(app.sliderId)
			.moveTo(700,20)
			.buttonDown()
			.buttonUp()
			.delay(1000)
			//make sure tooltip displays
			.elementById(app.tooltipId)
			.getClasses().should.eventually.not.contain(app.flipClass)
			.elementById(app.knobId)
			.moveTo()
			.buttonDown()
			.elementById(app.sliderPopup)
			.getAttribute('style').should.eventually.not.contain('display: none;')
			.buttonUp()
			.nodeify(done);
	});
});

app = {
	appId: 'gT-11069-TooltipChangesDirectionSlider',
	knobId: 'gT-11069-TooltipChangesDirectionSlider_slider1_knob',
	sliderPopup: 'gT-11069-TooltipChangesDirectionSlider_slider1_popup',
	tooltipId: 'gT-11069-TooltipChangesDirectionSlider_slider1_popupLabel',
	sliderId: "gT-11069-TooltipChangesDirectionSlider_slider1_bar",
	flipClass: 'moon-progress-bar-popup-flip-h'
};
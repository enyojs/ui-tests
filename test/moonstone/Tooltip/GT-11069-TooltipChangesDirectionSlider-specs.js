var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Tooltip/GT-11069-TooltipChangesDirectionSlider',
	title = 'Tooltip: Slider-Tooltip Direction Changes from Drag',
	tags = ['moonstone', 'qa', 'slider', 'tooltip'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should clear time when time set to null', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.waitForElementById(app.knobId)
			.moveTo()
			.buttonDown()			
			.elementById(app.sliderPopup)
			.getAttribute("style").should.eventually.not.contain("display: none;")
			.elementById(app.sliderPopup).text().should.eventually.equal("25")
			.elementById(app.sliderTapArea)
			.moveTo(900,20)
			.buttonDown()
			.buttonUp()
			.delay(1000)
			.elementById(app.tooltipId)
			.elementById(app.knobId)
			.moveTo()
			.buttonDown()
			//make sure tooltip displays
			.elementById(app.tooltipId)
			.getClasses().should.eventually.contain(app.flipClass)
			.elementById(app.sliderPopup)
			.getAttribute("style").should.eventually.not.contain("display: none;")						
			.elementById(app.sliderTapArea)
			.moveTo(800,20)			
			.buttonDown()
			.buttonUp()
			.delay(1000)
			.elementById(app.knobId)
			.moveTo()
			.buttonDown()
			//make sure tooltip displays
			.elementById(app.tooltipId)
			.getClasses().should.eventually.not.contain(app.flipClass)
			.elementById(app.sliderPopup)
			.getAttribute("style").should.eventually.not.contain("display: none;")
			.buttonUp()
			.nodeify(done);
	});

});

app = {
	appId: "app",
	knobId: "app_slider1_knob",
	sliderTapArea: "app_slider1_tapArea",
	sliderPopup: "app_slider1_popup",
	tooltipId: "app_slider1_popupLabel",
	flipClass: "moon-slider-popup-flip-h"
};
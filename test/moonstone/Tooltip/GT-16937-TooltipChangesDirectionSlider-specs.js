var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'ui-tests/test/loader.html?moonstone/Tooltip/GT-16937-TooltipChangesDirectionSlider',
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
			.waitForElementById(app.appId)
			.moveTo()
			.waitForElementById(app.knobId)
			.moveTo()
			.delay(1000)
			.buttonDown()			
			.elementById(app.sliderTapArea)
			.moveTo(905,20)
			.delay(1000)
			//make sure tooltip displays
			.enyoPropertyGet(app.sliderPopup, "style").should.eventually.not.contain("display: none;")
			.elementById(app.sliderTapArea)
			.moveTo(880,20)
			.delay(1000)

			.nodeify(done);
	});

});

app = {
	appId: "app",
	knobId: "app_slider1_knob",
	sliderTapArea: "app_slider1_tapArea",
	sliderPopup: "app_slider1_popup"
};


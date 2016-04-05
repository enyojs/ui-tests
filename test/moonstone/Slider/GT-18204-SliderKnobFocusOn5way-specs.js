var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Slider/GT-18204-SliderKnobFocusOn5way',
	title = 'GT-18204 - Slider: Focus displays on Slider Knob via 5way Navigation',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','slider','spotlight'];	// Tags show up in SauceLabs test output

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

	it('should have slider knob display on 5way navigation' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightDown)
			.elementById(app.slider1)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.slider1Popup)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.slider3ButtonLeft)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.slider3Popup)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.slider4)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.slider4Popup)
			.getComputedCss('display').should.eventually.not.equal('none')
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.elementById(app.slider5ButtonLeft)
			.delay(500)
			.getClasses().should.eventually.contain('spotlight')
			.elementById(app.slider5Popup)
			.getComputedCss('display').should.eventually.not.equal('none')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-18204-SliderKnobFocusOn5way',
	slider1: 'gT-18204-SliderKnobFocusOn5way_slider1',
	slider1Popup: 'gT-18204-SliderKnobFocusOn5way_slider1_popup',
	slider3ButtonLeft:'gT-18204-SliderKnobFocusOn5way_slider3_buttonLeft',
	slider3Popup: 'gT-18204-SliderKnobFocusOn5way_slider3_popup',
	slider4: 'gT-18204-SliderKnobFocusOn5way_slider4',
	slider4Popup: 'gT-18204-SliderKnobFocusOn5way_slider4_popup',
	slider5ButtonLeft: 'gT-18204-SliderKnobFocusOn5way_slider5_buttonLeft',
	slider5Popup: 'gT-18204-SliderKnobFocusOn5way_slider5_popup',
};

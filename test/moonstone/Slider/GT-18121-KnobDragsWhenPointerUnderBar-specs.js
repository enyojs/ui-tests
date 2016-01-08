var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file


var base = 'http://localhost:3000/',
	path = 'test/moonstone/Slider/GT-18121-KnobDragsWhenPointerUnderBar',
	title = 'GT-18121 - Slider: Slider Knob Drags Initially Below the Bar',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Slider'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var knobPosition = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});
	
	it('should expand and drag when pressed on the knob' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.slider1Knob)
			.getLocation().then(setLocation)
			.elementById(app.slider1Knob)
			.moveTo(30, 50)
			.buttonDown()
			.delay(1000)
			.elementById(app.slider1Knob)
			.getComputedCss('width').should.eventually.equal('90px')
			.elementById(app.slider1)
			.moveTo(1500, 30)
			.buttonUp()
			.delay(2000)
			.elementById(app.slider1Knob)
			.getLocation().then(checkDragRight)
			.elementById(app.slider1Knob)
			.buttonDown()
			.delay(1000)
			.elementById(app.slider1Knob)
			.getComputedCss('width').should.eventually.equal('90px')
			.elementById(app.slider1)
			.moveTo(200, 30)
			.buttonUp()
			.elementById(app.slider1Knob)
			.getLocation().then(checkDragLeft)
			.delay(1000)
			.nodeify(done);
	});

	var setLocation = function(location){
		knobPosition = location.y;
	};

	var checkDragRight = function(location){
		location.x.should.be.above(knobPosition);
		knobPosition = location.x;
	};

	var checkDragLeft = function(location){
		location.x.should.be.below(knobPosition);
	};

});

app = {
	slider1Knob: 'gT-18121-KnobDragsWhenPointerUnderBar_slider1_knob',
	slider1: 'gT-18121-KnobDragsWhenPointerUnderBar_slider1'
};

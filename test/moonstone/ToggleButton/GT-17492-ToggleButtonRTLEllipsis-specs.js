var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ToggleButton/GT-17492-ToggleButtonRTLEllipsis',
	title = 'GT-17492 - ToggleButton-RTL: Ellipsis displays with Overflowing Text',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ToggleButton','RTL','ellipsis'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var scrollWidth = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should display ellipsis with overflowing text' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory+'/#ar-SA')
			.waitForElementById(app.appId)
			.getComputedCss('direction').should.eventually.equal('rtl')
			.elementByTagName('body')
			.getClasses().should.eventually.contain('enyo-locale-right-to-left')
			.elementById(app.notificationsButton)
			.getClasses().should.eventually.contain('moon-toggle-button-on')
			.elementById(app.notificationsText)
			.getProperty('scrollWidth').then(setScrollWidth)
			//if checkForTextOverflow is true, then ellipsis should show
			.elementById(app.notificationsText)
			.getComputedCss('width').then(checkForTextOverflow)
			.elementById(app.notificationsText)
			.getComputedCss('textOverflow').should.eventually.equal('ellipsis')
			.nodeify(done);
	});

	var setScrollWidth = function(response){
		scrollWidth = response;
	};

	var checkForTextOverflow = function(response){
		var width = parseInt(response);
		width.should.be.below(scrollWidth);
	};
});

app = {
	appId: 'gT-17492-ToggleButtonRTLEllipsis',
	notificationsButton: 'gT-17492-ToggleButtonRTLEllipsis_toggleButton9',
	notificationsText: 'gT-17492-ToggleButtonRTLEllipsis_toggleButton9_client'
};
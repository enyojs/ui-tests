var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ToggleButton/GT-17493-ToggleButtonRTL',
	title = 'ToggleButton-RTL: Toggle Flips Position in RTL',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ToggleButton','RTL'];	// Tags show up in SauceLabs test output

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

	it('should display text as \'RTL\'' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory+'/#ar-SA')
			.waitForElementById(app.appId)
			.getComputedCss('direction').should.eventually.equal('rtl')
			.elementByTagName('body')
			.getClasses().should.eventually.contain('enyo-locale-right-to-left')
			//must use getComputedStyle because getComputedCss cannot find pseudo elements
			.execute('return getComputedStyle(document.getElementById("'+app.toggleButton8+'"), ":after").getPropertyValue("right")')
			.should.eventually.equal('auto')
			.execute('return getComputedStyle(document.getElementById("'+app.toggleButton8+'"), ":after").getPropertyValue("left")')
			.should.eventually.not.equal('auto')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-17493-ToggleButtonRTL',
	toggleButton8: 'gT-17493-ToggleButtonRTL_toggleButton8'
};
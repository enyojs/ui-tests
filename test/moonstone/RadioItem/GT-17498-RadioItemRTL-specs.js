var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/RadioItem/GT-17498-RadioItemRTL',
	title = 'RadioItem-RTL: Toggle Flips Position in RTL',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','radioItem','RTL'];	// Tags show up in SauceLabs test output

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

	it('should display content \'RTL\'' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory+'/#ar-SA')
			.waitForElementById(app.appId)
			.getComputedCss('direction').should.eventually.equal('rtl')
			.elementByTagName('body')
			.getClasses().should.eventually.contain('enyo-locale-right-to-left')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-17498-RadioItemRTL'
};

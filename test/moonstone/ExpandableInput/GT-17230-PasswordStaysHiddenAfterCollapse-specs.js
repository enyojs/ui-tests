var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ExpandableInput/GT-17230-PasswordStaysHiddenAfterCollapse',
	title = 'GT-17230 - ExpandableInput: Password Stays Hidden when Input Collapses',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','ExpandableInput'];	// Tags show up in SauceLabs test output

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

	it('should hide password in input after you close expandable input' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.header)
			.click()
			.elementById(app.expandableInput)
			.getClasses().should.eventually.contain('open')
			.enyoPropertySet(app.passwordInput, 'value', '1234567')
			.elementById(app.header)
			.click()
			.delay(1000)
			.elementById(app.expandableInput)
			.getClasses().should.eventually.not.contain('open')			
			.elementById(app.inputHeaderText)
			.getComputedCss('display').should.eventually.equal('none')			
			.nodeify(done);
	});

});

app = {
	header: 'gT-17230-PasswordStaysHiddenAfterCollapse_expandableInput_header_header',
	expandableInput: 'gT-17230-PasswordStaysHiddenAfterCollapse_expandableInput',
	passwordInput: 'gT-17230-PasswordStaysHiddenAfterCollapse_expandableInput_clientInput',
	inputHeaderText: 'gT-17230-PasswordStaysHiddenAfterCollapse_expandableInput_header_text'
};

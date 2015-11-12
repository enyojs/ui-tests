var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Popup/GT-13951-BindingValuesChange',
	title = 'GT-13951 - ContextualPopup: Binding Values change in Popup',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'popup'];	// Tags show up in SauceLabs test output

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

	it('should change value when radio button is changed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.buttonTapArea)
			.click()
			.delay(1000)
			.elementById(app.nestedRadioPopup)
			.getAttribute('style').should.eventually.not.contain('display: none;')
			.elementById(app.nestedRadioValue)
			.text().should.eventually.contain('Creek')
			.elementById(app.creekRadioButton)
			.getAttribute('selected').should.eventually.equal('true')

			.elementById(app.oceanRadioButton)
			.click()
			.delay(1000)
			.elementById(app.nestedRadioValue)
			.text().should.eventually.contain('Ocean')
			.elementById(app.oceanRadioButton)
			.getAttribute('selected').should.eventually.equal('true')
			.nodeify(done);
	});

});

app = {
	buttonTapArea: 'gT-13951-BindingValuesChange_contextualPopupButton_client',
	creekRadioButton: 'gT-13951-BindingValuesChange_radioItem',
	oceanRadioButton: 'gT-13951-BindingValuesChange_radioItem3',
	nestedRadioValue: 'gT-13951-BindingValuesChange_nestedRadioValue',
	nestedRadioPopup: 'gT-13951-BindingValuesChange_nestedRadioPopup'
};

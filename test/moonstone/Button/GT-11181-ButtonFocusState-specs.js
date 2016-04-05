var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/Button/GT-11181-ButtonFocusState',
	title = 'GT-11181 - Button: \'Selected + Focus\' State displays after pointer timeout',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'button'];	// Tags show up in SauceLabs test output

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

	it('should maintain selected and focus state after pointer times out', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			//start cursor on app_divider
			.waitForElementById(app.appDivider)
			.moveTo()
			.delay(500)
			//move cursor on app
			.elementById(app.appID)
			.moveTo()
			.delay(500)
			//move cursor to button
			.elementById(app.appleButtonID)
			.moveTo()
			.delay(500)
			.getClasses().should.eventually.contain('spotlight')
			//click button
			.elementById(app.appleButtonID)
			.click()
			.delay(1000)
			//check to see active + spotlight state
			.elementById(app.appleButtonID)
			.getClasses().should.eventually.contain('active')
			.elementById(app.appleButtonID)
			.moveTo(10,10)
			.moveTo()
			.elementById(app.appleButtonID)
			.getClasses().should.eventually.contain('spotlight')
			//move cursor off button
			.elementById(app.appDivider)
			.moveTo()
			.delay(2000)
			//check to make sure focus is off but selected is on
			.elementById(app.appleButtonID)
			.getClasses().should.eventually.contain('active')
			.elementById(app.appleButtonID)
			.getClasses().should.eventually.not.contain('spotlight')
			.elementById(app.appleButtonID)
			.moveTo()
			//wait for cursor to disappear
			.delay(10000)
			.elementById(app.appleButtonID)
			.getClasses().should.eventually.contain('spotlight')
			.nodeify(done);
	});
});

app = {
	appleButtonID: 'gT-11181-ButtonFocusState_appleButton',
	bananaButtonID: 'gT-11181-ButtonFocusState_bananaButton',
	appDivider: 'gT-11181-ButtonFocusState_divider',
	appID: 'gT-11181-ButtonFocusState'
};
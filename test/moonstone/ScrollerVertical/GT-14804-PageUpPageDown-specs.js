var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ScrollerVertical/GT-14804-PageUpPageDown',
	title = 'GT-14804 - PageUp/Down: USB Keyboard\'s Page Up/Down scrolls content',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','pageup','pagedn','ScrollerVertical'];	// Tags show up in SauceLabs test output

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

	it('should page up and down when pressed' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.moveTo()
			.elementById(app.firstHeader)
			.moveTo()
			.elementById(app.vthumb)
			.getLocation().should.eventually.have.property('y', 330)
			.keys(helpers.keys.Pagedown)
			.keys(helpers.keys.Pagedown)
			.delay(1000)
			.elementById(app.vthumb)
			.getLocationInView().should.eventually.have.property('y').should.be.eventually.above(330)
			.keys(helpers.keys.Pageup)
			.keys(helpers.keys.Pageup)
			.delay(1000)
			.elementById(app.vthumb)
			.getLocation().should.eventually.have.property('y', 330)
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14804-PageUpPageDown',
	vthumb: 'gT-14804-PageUpPageDown_scroller_strategy_vthumb',
	firstHeader: 'gT-14804-PageUpPageDown_expandablePicker_header_header'
};
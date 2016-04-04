var helpers = rootRequire('./helpers'),
	app = {};

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ListAction/GT-13619-ScrollThumbOnWheel',
	title = 'GT-13619 - ListActions: Scroll Thumb Displays upon Wheeling',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'list', 'list action', 'scroll'];	// Tags show up in SauceLabs test output

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

	it('should show scroll thumb', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.contextualPopupActivator)
			.click()
			.delay(2000)
			.elementById(app.scrollPort)
			.moveTo()
			.elementById(app.scrollPort)
			.mousewheel(500)
			.elementById(app.scrollThumb)
			.getClasses().should.eventually.not.contain('hidden')
			.nodeify(done);
	});
});

app = {
	appID: 'gT-13619-ScrollThumbOnWheel',
	contextualPopupActivator: 'gT-13619-ScrollThumbOnWheel_contextualPopupDecorator2_activator',
	scrollPort: 'gT-13619-ScrollThumbOnWheel_scroller4_strategy_client',
	scrollThumb: 'gT-13619-ScrollThumbOnWheel_scroller4_strategy_vthumb'
};

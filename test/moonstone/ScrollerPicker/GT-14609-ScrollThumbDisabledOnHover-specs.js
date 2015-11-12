var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ScrollerPicker/GT-14609-ScrollThumbDisabledOnHover',
	title = 'GT-14609 - ScrollerVertical: Scroll Thumb Does Not Display upon item Hover',
	directory = 'ui-tests/dist',
	tags = ['moonstone', 'qa', 'Scroller Vertical', 'hover'];	// Tags show up in SauceLabs test output

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

	it('Should enable paging controls when available to scroll', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.headerTitle)
			.moveTo()
			.waitForElementById(app.scrollerViewPort)
			.moveTo()
			.elementById(app.scrollThumb)
			.getClasses().should.eventually.contain('hidden')
			.elementById(app.vColumn)
			.getClasses().should.eventually.contain('visible')
			.nodeify(done);
	});

});

app = {
	appId: 'gT-14609-ScrollThumbDisabledOnHover',
	scrollerViewPort: 'gT-14609-ScrollThumbDisabledOnHover_scroller_strategy_viewport',
	scrollThumb: 'gT-14609-ScrollThumbDisabledOnHover_scroller_strategy_vthumb',
	vColumn: 'gT-14609-ScrollThumbDisabledOnHover_scroller_strategy_vColumn',
	headerTitle: 'gT-14609-ScrollThumbDisabledOnHover_panel_header_title'
};
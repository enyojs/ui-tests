var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/ScrollerVertical/GT-18095-ScrollThumbDisplaysTopBottom',
	title = 'ScrollerVertical: Scroll Thumb Displays when reaching Top/End of Scroll Content',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','Scroller','Scroll Thumb'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var lastPoint = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should display scroll thumb when scrolling is at top or bottom' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.vThumb)
			.getClasses().should.eventually.not.contain('hidden')
			.elementById(app.scroller)
			.mousewheel(-1000)
			.delay(1000)
			.elementById(app.vThumb)
			.getLocation().then(setPoint)
			.delay(1000)
			.elementById(app.scroller)
			.mousewheel(-1000)
			.elementById(app.vThumb)
			.getClasses().should.eventually.not.contain('hidden')
			.elementById(app.vThumb)
			.delay(1000)
			.getLocation().then(checkPoint)
			.elementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.scroller)
			.mousewheel(1000)
			.delay(1000)
			.elementById(app.vThumb)
			.getLocation().then(setPoint)
			.delay(1000)
			.elementById(app.scroller)
			.mousewheel(1000)
			.elementById(app.vThumb)
			.getClasses().should.eventually.not.contain('hidden')
			.elementById(app.vThumb)
			.delay(1000)
			.getLocation().then(checkPoint)
			.nodeify(done);
	});

	//set point after scroll down. HOW TO USE: set second to last scroll up/down. and check after last scroll.
	var setPoint = function(res){
		lastPoint = res.y;
	};

	//Check if last point lowest point is equal to current point. Will determine if we're at the top or bottom.
	var checkPoint = function(res){
		res.y.should.equal(lastPoint);
	};
});

app = {
	appId: 'gT-18095-ScrollThumbDisplaysTopBottom',
	headerTitle: 'gT-18095-ScrollThumbDisplaysTopBottom_panel_header_title',
	panelBody: 'gT-18095-ScrollThumbDisplaysTopBottom_panel_panelBody',
	scroller: 'gT-18095-ScrollThumbDisplaysTopBottom_scroller_strategy_client',
	vThumb: 'gT-18095-ScrollThumbDisplaysTopBottom_scroller_strategy_vthumb'
};
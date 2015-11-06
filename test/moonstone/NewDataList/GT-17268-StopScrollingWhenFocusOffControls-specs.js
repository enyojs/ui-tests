var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/NewDataList/GT-17268-StopScrollingWhenFocusOffControls',
	title = 'GT-17268 - NewDataList: Scroll Content Stops when 5way Navigating away from Scroll Controls',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','NewDataList','scroll'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var currentVThumbPosition = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should stop scrolling when focus is off scroll controls' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.appId)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.keys(helpers.keys.SpotlightSelect)
			.delay(1000)
			.elementById(app.vthumb)
			.getLocation().then(setCurrentScrollPosition)
			.keys(helpers.keys.SpotlightSelect)
			.keys(helpers.keys.SpotlightLeft)
			.delay(1000)
			.elementById(app.vthumb)
			.getLocation().then(checkCurrentScrollPosition)
			//check that element with spotlight is a grid list image item
			.elementByCss('.spotlight').getClasses().should.eventually.contain('moon-gridlist-imageitem')
			.nodeify(done);
	});

	var setCurrentScrollPosition = function(location){
		currentVThumbPosition = location.y;
	};

	//regular scroll moves about 25 px so we need to make sure the the difference is less than that
	var checkCurrentScrollPosition = function(location){
		currentVThumbPosition.should.be.closeTo(location.y, 16);
	};

});

app = {
	appId: 'gT-17268-StopScrollingWhenFocusOffControls',
	vthumb: 'gT-17268-StopScrollingWhenFocusOffControls_list_scrollControls_vthumb'
};

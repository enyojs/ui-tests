var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/NewDataList/GT-17242-5WayScrollingHorizontal',
	title = 'GT-17242 - NewDataList: Scrolling using 5-way in Horizontal layout',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','NewDataList','scroll'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var Q = helpers.wd.Q;
	var startingLocation = 0;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, path, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should scroll while using 5 way while in horizontal state' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.hthumb).getLocationInView().then(setLocationHeight)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight).then(checkThumbPosition)
			.nodeify(done);
	});

	var checkThumbPosition = function(){
			return Q.fcall(function(){
				return browser
							.elementById(app.hthumb)
							.getLocationInView()
							.should.eventually.have.property('x')
							.should.be.eventually.above(startingLocation);
			}
		);
	};

	var setLocationHeight = function(location){
		startingLocation = location.x;
	};
});

app = {
	hthumb: 'gT-17242-5WayScrollingHorizontal_list_scrollControls_hthumb'
};

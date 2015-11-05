var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/NewDataList/GT-17240-5wayScrollVertical',
	title = 'DataGridList: 5way Out of a Container',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','DataGridList','scroll'];	// Tags show up in SauceLabs test output

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

	it('should scroll using 5way' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.vthumb).getLocationInView().then(setLocationHeight)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.elementById(app.vthumb)
			.getLocation().should.eventually.have.property('y', 450)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown).then(checkTransformValue)
			.nodeify(done);
	});

	var checkTransformValue = function(){
			return Q.fcall(function(){
				return browser
							.elementById(app.vthumb)
							.getLocationInView()
							.should.eventually.have.property('y')
							.should.be.eventually.above(startingLocation);
			}
		);
	};

	var setLocationHeight = function(location){
		startingLocation = location.y;
	};

});

app = {
	appId: 'gT-17240-5wayScrollVertical',
	vthumb: 'gT-17240-5wayScrollVertical_list_scrollControls_vthumb'
};

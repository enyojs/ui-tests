var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/NewDataList/GT-17103-LongPressCausesListBounce',
	title = 'GT-17103 - NewDataList: Long Press Hold Causes List to Bounce',
	directory = 'ui-tests/dist',
	tags = ['moonstone','qa','NewDataList'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;
	var asserters = helpers.wd.asserters; // asserter base class
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

	it('should bounce when up is held down' , function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.waitForElementById(app.imageItem1)
			.getLocation().then(setLocationHeight)
			.keys(helpers.keys.SpotlightRight)
			.delay(1000)
			.keys(helpers.keys.SpotlightRight)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(500)
			.keys(helpers.keys.SpotlightDown)
			.delay(2000)
			.elementById(app.pageUpControl)
			.moveTo()
			.delay(2000)
			.buttonDown()
			.waitFor(asserters.jsCondition('document.getElementById("'+app.pageUpControl+'").getAttribute("class").indexOf("disabled") > 0') , 20000, 200)
			.then(checkTransformValue)
			.buttonUp()
			.nodeify(done);
	});

	var checkTransformValue = function(){
		return Q.fcall(function(){
			return browser
					.elementById(app.imageItem1)
					.getLocation()
					.should.eventually.have.property('y')
					.should.be.eventually.above(startingLocation);
		});
	};

	var setLocationHeight = function(location){
		startingLocation = location.y;
	};
});

app = {
	appId: 'gT-17103-LongPressCausesListBounce',
	pageUpControl: 'gT-17103-LongPressCausesListBounce_list_scrollControls_pageUpControl',
	imageItem1: 'gT-17103-LongPressCausesListBounce_gridListImageItem'
};

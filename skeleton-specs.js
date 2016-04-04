var helpers = rootRequire('./helpers'),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/path/to/test',
	title = 'Skeleton Test',
	directory = 'ui-tests/dist',
	tags = ['sample'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		helpers.epack(path, function(){
			browser = helpers.initBrowser(title, tags, base, path, done);
		})
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it('should test description', function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(directory)
			.nodeify(done);
	});

});

app = {
	// Test-specific constants can be placed here
};

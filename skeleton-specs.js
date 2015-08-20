var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	path = 'test/moonstone/path/to/test',
	title = 'Skeleton Test',
	tags = ['sample'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		helpers.epack(path);
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it("should test description", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(base + 'ui-tests/dist')
			.nodeify(done);
	});

});

app = {
	// Test-specific constants can be placed here
};

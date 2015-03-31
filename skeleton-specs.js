var helpers = rootRequire("./helpers"),
	app = {};	// Test-specific settings at bottom of the file

var base = 'http://localhost:3000/',
	url = 'lib/moonstone/samples/Sample.html?DataGridListSample',
	title = 'Skeleton Test',
	tags = ['sample'];	// Tags show up in SauceLabs test output

describe(title, function() {
	var browser;

	before(function(done) {
		browser = helpers.initBrowser(title, tags, base, done);
	});

	after(function(done) {
		browser
			.quit()
			.nodeify(done);
	});

	it("Should enable paging controls when available to scroll", function (done) {
		browser
			.setWindowSize(1920,1280)
			.get(url)
			.nodeify(done);
	});

});

app = {
	// Test-specific constants can be placed here
};

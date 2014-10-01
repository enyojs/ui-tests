var wd = require('wd');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised"),
	url = 'http://localhost:3000/lib/moonstone/samples/RadioItemSample.html',
	title = 'Moonstone Radio Item Sample';

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// checking sauce credential
if(!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY){
    console.warn(
        '\nPlease configure your sauce credential:\n\n' +
        'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
        'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
    );
    throw new Error("Missing sauce credentials");
}

// http configuration, not needed for simple runs
wd.configureHttp( {
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
});

var desired = JSON.parse(process.env.DESIRED || '{browserName: "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];

wd.addElementPromiseChainMethod(
  'getClasses',
  function() {
    return this
		.getAttribute('class').then(function(res) {
			return res.split(' ');
		});
  }
);

wd.addPromiseChainMethod(
  'enyoProperty',
  function(id, prop) {
    return this.execute("return enyo.$['" + id + "'].get('" + prop + "');");
  }
);


describe('Radio Item Sample Test', function() {
    var browser;
    var allPassed = true;

    before(function(done) {
        var username = process.env.SAUCE_USERNAME;
        var accessKey = process.env.SAUCE_ACCESS_KEY;
        browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
        if(process.env.VERBOSE){
            /* optional logging     
            browser.on('status', function(info) {
                console.log(info.cyan);
            });
            browser.on('command', function(meth, path, data) {
                console.log(' > ' + meth.yellow, path.grey, data || '');
            });*/
        }
        browser
			.init(desired)
            .nodeify(done);
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');
        done();
    });

    after(function(done) {
        browser
            .quit()
            .nodeify(done);
    });

    it("Should have correct title", function(done) {
        browser
			.get(url)
            .title()
            .should.become(title)
            .nodeify(done);
    });

	it("Should have correct defaults", function (done) {
		browser
			.elementsByCssSelector('.moon-radio-item.selected')
				.should.eventually.have.length(1, 'one selected at start')
			.elementsByCssSelector('.moon-radio-item')
				.should.eventually.have.length(12, 'twelve radio items')
			.elementById('radioItemSample_radioItem3')
				.getClasses().should.eventually.contain('disabled', 'radio 3 disabled')
			.elementById('radioItemSample_radioItem7')
				.getClasses().should.eventually.contain('disabled', 'radio 7 disabled')
			.elementById('radioItemSample_radioItem11')
				.getClasses().should.eventually.contain('disabled', 'radio 11 disabled')
			.nodeify(done);
	});

	it('Should have working ungrouped radio items', function (done) {
		browser
			// Single radio item
			.elementByCssSelector('#radioItemSample_radioItem')
				.click()
				.enyoProperty('radioItemSample_radioItem', 'selected').should.eventually.be.true
				.elementsByCssSelector('.moon-radio-item.selected')
					.should.eventually.have.length(2, 'two selected items')
			// two radio items
			.elementByCssSelector('#radioItemSample_radioItem2')
				.click()
				.enyoProperty('radioItemSample_radioItem', 'selected').should.eventually.be.true
				.enyoProperty('radioItemSample_radioItem2', 'selected').should.eventually.be.true
			// Back to single radio item
			.elementByCssSelector('#radioItemSample_radioItem')
				.click()
				.enyoProperty('radioItemSample_radioItem', 'selected').should.eventually.be.false
				.enyoProperty('radioItemSample_radioItem2', 'selected').should.eventually.be.true
			// Test disabled radio item
			.elementByCssSelector('#radioItemSample_radioItem3')
				.click()
				.enyoProperty('radioItemSample_radioItem3', 'selected').should.eventually.be.false
		.nodeify(done);
	});

});

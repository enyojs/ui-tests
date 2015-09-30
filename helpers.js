// This module provides a common starting point for all the tests and makes sure to include
//  all the pieces necessary while reducing the boilerplate required in each individual test.
//  The return includes a reference to the wd object in case additional settings are needed.
//  The main entry point is the `initBrowser` method, which will set up the correct settings
//  for the environment (local, SauceLabs, webOS).
//
//  Additional methods can be added to wd by modifying the `initCustomMethods` method.
'use strict';

var wd;
try {
	wd = require('webos-wdjs-adapter');
} catch(err) {
	wd = require('wd');
}

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var shelljs = require('shelljs');

var fakeBrowser = {
	quit: function() {
		return wd.Q(true);
	}
};

var helpers = module.exports = {
	wd: wd,
	// initBrowser sets up the browser object that forms the base of the test integration
	//  On error, it will abort the test and return a dummy browser object.
	// arguments: title - A string representing the title of the test
	//            tags - an array of strings for SauceLabs
	//            baseUrl - base URL for configuring HTTP
	//            path - Path to test JS file directory for packaging
	//            done - a callback to be handled when initialization complete
	// returns:   browser - a reference to the browser object
	initBrowser: function (title, tags, baseUrl, path, done) {
		var browser, desired;

		if(!this.epack(path)) {
			done(new Error('enyo pack error'));
			return fakeBrowser;
		}

		chai.use(chaiAsPromised);
		chai.should();
		chaiAsPromised.transferPromiseness = wd.transferPromiseness;

		desired = this.initEnvironment(title, tags, baseUrl);
		this.initCustomMethods();
		if(process.env.SAUCE === 'true') {
			var username = process.env.SAUCE_USERNAME;
			var accessKey = process.env.SAUCE_ACCESS_KEY;
			browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
		} else if(desired.webOS) {
			var ip = process.env.WEBOS_IP;
			var port = process.env.WEBOS_PORT || 22;
			browser = wd.promiseChainTVRemote(ip, port);
		} else {
			browser = wd.promiseChainRemote();
		}
		browser.init(desired).nodeify(done);
		return browser;
	},
	// An internal method used by initBrowser but left in place in case it is needed separately.
	// Initializes the requested environment
	// arguments: title - Title of the app, passed to SauceLabs
	//            tags - array of strings describing the test, passed to SauceLabs
	// returns:   An object that represents the desired browser settings
	initEnvironment: function(title, tags, baseUrl) {
		var desired = JSON.parse(process.env.DESIRED || '{browserName: "chrome"}');
		var remapLocalhost = process.env.REMAP_LOCALHOST;

		if(remapLocalhost && baseUrl) {
			baseUrl = baseUrl.replace('localhost:3000', remapLocalhost);	// TODO: Move to environment variables
		}
		if(process.env.SAUCE === 'true') {
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
				timeout: 150000,
				retryDelay: 15000,
				retries: 5
			});
			if(process.env.TRAVIS_JOB_NUMBER) {	// Running on travis
				desired['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
			}
		}
		else if(desired.webOS) {
			if(!process.env.WEBOS_IP) {
				console.warn(
					'\nPlease configure your webOS IP address:\n\n' +
					'export WEBOS_IP=<IP ADDRESS>\n\n'
				);
				throw new Error("Missing WEBOS_IP");
			}
		}

		if(baseUrl) {
			wd.configureHttp({
				baseUrl: baseUrl
			});
		}

		desired.name = title + ' with ' + desired.browserName;
		desired.tags = tags;

		return desired;
	},
	// Add custom methods to the wd object
	// arguments: none
	// returns: none
	initCustomMethods: function() {
		// Returns the classes on an element as an array
		wd.addElementPromiseChainMethod('getClasses', function() {
			return this
				.getAttribute('class').then(function(res) {
					return res.split(' ');
				});
		});

		wd.addElementPromiseChainMethod('scrollIntoView', function() {
			var _this = this;
			return this.browser.execute('arguments[0].scrollIntoView(true);', [{ELEMENT: this.value}]).then(function() { return _this; });
		});

		wd.addElementPromiseChainMethod('textAsInt', function() {
			return this
				.text().then(function(res) {
					return parseInt(res);
				});
		});

		wd.addElementPromiseChainMethod('mousewheel', function(scrollAmount) {
			var _this = this;
			return this.getAttribute("id").then(function(res){
				return _this.browser.execute("function wheel(){}view = document.getElementById('"+res+"');view.addEventListener('DOMMouseScroll',wheel,!1),window.ChromeWheel=function(){var e=document.createEvent('MouseEvents');e.initMouseEvent('DOMMouseScroll',!0,!0,window,"+scrollAmount+",0,0,0,0,0,0,0,0,0,null),view.dispatchEvent(e)};ChromeWheel()");
			});
		});

		wd.addElementPromiseChainMethod('getProperty', function(prop) {
			var _this = this;
			return this.getAttribute('id').then(function(id){
				return _this.browser.execute('return document.getElementById("'+id+'").'+prop+';');
			});
		});

		wd.addElementPromiseChainMethod('enyoGetParentElementId', function() {
			var _this = this;
			return this.getAttribute('id').then(function(id){
				return _this.browser.execute('dispatcher = require("enyo/dispatcher"); return dispatcher.$["'+id+'"].parent.id;');
			});
		});

		wd.addElementPromiseChainMethod('getProperty', function(prop) {
			var _this = this;
			return this.getAttribute('id').then(function(id){
				return _this.browser.execute('return document.getElementById("'+id+'").'+prop+';');
			});
		});

		//Returns top element from an elements center coordinates. Helps us find top element in picker scroller.
		wd.addElementPromiseChainMethod('getTopElementText', function() {
			var _this = this;
			return this.getAttribute('id').then(function(id){
				return _this.browser.execute('function getTopElement(id){ var el = document.getElementById(id); var rect = el.getBoundingClientRect(); var x = (rect.left + rect.right) / 2; var y = (rect.top + rect.bottom) / 2; return document.elementFromPoint(x, y).innerHTML; } return getTopElement("'+id+'")');
			});
		});

		// Returns the value of an enyo kind's property. The kind is referenced by its `id`.
		// TODO: Add an element method?
		wd.addPromiseChainMethod('enyoPropertyGet', function(id, prop) {
			return this.execute('dispatcher = require("enyo/dispatcher"); return dispatcher.$["' + id + '"].get("' + prop + '");');
		});

		// Sets the value of an enyo kind's property. The kind is referenced by its `id`.
		// TODO: Add an element method?
		wd.addPromiseChainMethod('enyoPropertySet', function(id, prop, value) {
			return this.execute('dispatcher = require("enyo/dispatcher"); dispatcher.$["' + id + '"].set("' + prop + '", ' + JSON.stringify(value) + ');');
		});
	},
	// Runs the enyo pack command to generate output
	epack: function(module) {
		var libpath = 'lib',
			command = 'enyo pack --script-safe --clean --paths=' + libpath + ' -d dist ' + module;

		try {
			var result = shelljs.exec(command, {silent: true});
			if(result.code !== 0) {
					console.log('Error running enyo pack:');
					console.log(result.output);
					return false;
			} else { console.log(result.output); }
		} catch(err) {
			console.log("enyo pack exec failure");
			console.log(err);
			return false;
		}
		return true;
	},
	// An alias for the special keys.  We add some Spotlight specific names below for clarity.
	keys: wd.SPECIAL_KEYS
};

// Add some aliases for Spotlight controls
helpers.keys.SpotlightDown = wd.SPECIAL_KEYS['Down arrow'];
helpers.keys.SpotlightUp = wd.SPECIAL_KEYS['Up arrow'];
helpers.keys.SpotlightRight = wd.SPECIAL_KEYS['Right arrow'];
helpers.keys.SpotlightLeft = wd.SPECIAL_KEYS['Left arrow'];
helpers.keys.SpotlightSelect = wd.SPECIAL_KEYS['Enter'];
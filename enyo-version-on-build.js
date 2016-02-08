var request = require('superagent');
var _ = require('lodash');
var shelljs = require('shelljs');

var changeEnyoVersions = function(buildNumber, boardNumber, username, password, done){
	console.log('checking out ...');
	if(_.includes(boardNumber.toLowerCase(), 'm14')){
		var deviceType = 'starfish-master-official-m14tv';
	} else if(_.includes(boardNumber.toLowerCase(), 'h15')){
		var deviceType = 'starfish-master-official-h15';
	} else if(_.includes(boardNumber.toLowerCase(), 'm16')){
		var deviceType = 'starfish-master-official-m16';
	} else if(_.includes(boardNumber.toLowerCase(), 'w2')){
		var deviceType = 'webos-wearable-master-official-w2';
	}

	request
	  .get('http://ushquc001.palm.com/official_26/'+deviceType+'/'+buildNumber+'/package-srcuris.txt')
	  .auth(username, password)
	  .end(function(err, res){
	  	var list = _.split(res.text, '\n');

	  	var libraries = ['canvas', 'enyo', 'enyo-cordova','enyo-ilib', 'enyo-webos', 'layout', 'moonstone-extra', 'moonstone', 'onyx', 'spotlight', 'garnet', 'svg'];

	  	/*
		  	Interate through each library and add proper commit id to object.
		  	NOTE: One limitation of this approach is that if there are duplicate libraries of enyo2sampler we will take the last one.
		  	Typically this is not a problem with current builds (~1024 as of this writing), but is a problem with older builds.
	  	*/
	  	var commitIds = {};
	  	_.forEach(list, function(value){
	  		for (var i = 0; i < libraries.length; i++) {
	  			if(_.includes(value, 'enyo2sampler') && _.includes(value, libraries[i]+'_pn')){
  					commitIds[libraries[i]] = _.split(value, '"')[1];
	  			}
	  		}
	  	});

		_.forEach(commitIds, gitCheckoutLibrary);
		done();
	  });

};
//checkout commit
function gitCheckoutLibrary(commitId, library){
	if(commitId){
		//allow output for TAS debugging
		shelljs.exec('cd lib/'+_.kebabCase(library)+' && git checkout '+commitId+' && cd ../..',{silent: false});
	}
}

exports.changeEnyoVersions = changeEnyoVersions;
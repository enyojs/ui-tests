var shelljs = require('shelljs');
var _ = require('lodash');

/*
	runs egrep on all spec files used to find tags
	PATTERN to find matching pattern.
	INVERSE=true to find opposite.
	EXCLUDE to do this but not that queries.
*/
var getTestsByContents = function(){
	var pattern = process.env.PATTERN;
	var inverse = process.env.INVERSE === 'true' ? '-rLi' : '-rli';
	var exclude = process.env.EXCLUDE ? '| egrep -vi ' + process.env.EXCLUDE : ''

	var result = shelljs.exec('egrep '+inverse+' --include="*specs.js" "'+pattern+'" test '+exclude, {silent: true});
	var resultsArray = result.output.split('\n');
	resultsArray.pop();

	return resultsArray;
};

var getAllUsedTests = function(){
	if (process.env.PATTERN){
		return getTestsByContents();
	} else {
		return ['test/**/*-specs.js'];
	}
};

exports.getAllUsedTests = getAllUsedTests;
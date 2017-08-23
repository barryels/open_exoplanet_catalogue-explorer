'use strict';

var fs = require('fs'),
	xml2js = require('xml2js');

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/data.xml', function (err, data) {
	parser.parseString(data, function (err, result) {
		fs.writeFile('data.json', JSON.stringify(result, null, 2), function (err) {
			if (err) return console.log(err);
			console.log('Hello World > helloworld.txt');
		});
		// console.dir(result);
		// console.log('Done');
	});
});

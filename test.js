const preprocessor = require('./preprocessor');

const loc_in = [
	'// #prefix foo with super',
	'// #if FOO',
	'I am foo.',
	'// #elseif BAR',
	'I am bar.',
	'// #fi',
	'I am here for foo and bar.'
];

var loc_out = preprocessor(loc_in, ['FOO']);
console.log(loc_out);

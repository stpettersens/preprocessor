const preprocessor = require('./preprocessor');

const loc_in = [
	'// #if FOO',
	'// #prefix foo with super',
	'I am foo.',
	'// #elseif BAR',
	'// #prefix bar with super',
	'I am bar.',
	'// #fi',
	'I am here for foo and bar.'
];

var loc_out = preprocessor(loc_in, ['FOO']);
console.log(loc_out);

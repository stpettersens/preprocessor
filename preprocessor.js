/*
    Preprocessor.
    A simple generic preprocessor implementation as a CommonJS module.

    Copyright 2016 Sam Saint-Pettersen.
    Released under the MIT/X11 License.
*/

/**
 * Preprocessor function.
 * @param input string[] LoC strings as input.
 * @param conditions string[] conditional strings.
 * @returns Preprocessed LoC strings as output.
*/
function preprocessor(input, conditions) {
	var preprocessed = [];
	var cond = null;
	var prefixed = [];
	var prefixes = [];
	var in_pp = false;

	for(var i = 0; i < input.length; i++) {
		// Process prefix...
		var m = input[i].match(/#prefix (.*) with (.*)/);
		if(m !== null) {
			prefixed.push(m[1]);
			prefixes.push(m[2]);
			continue;
		}
		// Process conditional (if/else/elseif)...
		m = input[i].match(/#[else]*[if]* (.*)/);
		if(m != null) {
 			cond = m[1];
 			in_pp = true;
 			continue;
		}

		// Process end block...
		if(/#[fi|endif]/.test(input[i])) {
			in_pp = false;
			continue;
		}
		// Push relevant LoC to array...
		conditions.map(function(sc) {
			if(in_pp && cond == sc) {
				preprocessed.push(input[i]);
			}
		});
		if(!in_pp) {
			preprocessed.push(input[i]);
			continue;
		}
	}
	preprocessed = preprocessed.map(function(l) {
		var pl = l;
		var i = 0;
		prefixed.map(function(p) {
			pl = pl.replace(p, prefixes[i] + p);
			i++;
		});
		return pl;
	});
	
	return preprocessed;
}

module.exports = preprocessor;

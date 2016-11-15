var MODULE_REQUIRE
	, os = require('os')
	, colors = require('colors')
	;

var _ME = {};

var _replace_tags = function(text, delimeter, processor) {
	var output = '';
	text = text.replace('\n', os.EOL);

	var m, n, step = delimeter.length, tag;
	while ((m = text.indexOf(delimeter)) >= 0) {
		n = text.indexOf(delimeter, m + step);
		if (n > 0) {
			var left  = text.substring(0, m);
			var tag   = text.substring(m + step, n);
			var right = text.substring(n + step);

			output +=  left + processor(tag);
			text = right;
		}
		else {
			break;
		}
	}
	output += text;
	return output;
}

_ME.markup = function(text) {
	text = _replace_tags(text, '*', colors.bold);
	text = _replace_tags(text, '_', colors.italic);
	text = _replace_tags(text, '`', colors.italic.green);
	text = _replace_tags(text, '#', colors.dim);
	return text;
};

_ME.error = function(text) {
	console.log(colors.red('[x] ' + _ME.markup(text)));
};

_ME.warn = function(text) {
	console.log(colors.yellow('[!] ' + _ME.markup(text)));
}

_ME.info = function(text) {
	console.log('[.] ' + _ME.markup(text));
};

module.exports = _ME;

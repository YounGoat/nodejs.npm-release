var MODULE_REQUIRE
	, fs = require('fs')
	, path = require('path')
	, minimist = require('minimist')
	, semver = require('semver')
	;

var logger = require('./logger');

var OPTIONS = minimist(process.argv.slice(2));

OPTIONS.path = OPTIONS.path
	? path.resolve(OPTIONS.path)
	: process.cwd();

if (!fs.existsSync(OPTIONS.path)) {
	logger.error('Package does not exists at: _' + OPTIONS.path + '_');
	process.exit(40);
}

if (fs.existsSync(path.join(OPTIONS.path, 'yupp.json'))) {
	OPTIONS.config = require(path.join(OPTIONS.path, 'yupp.json'));
}
else {
	OPTIONS.config = {};
}

OPTIONS.upgrade = OPTIONS.u || OPTIONS.upgrade;
OPTIONS.push    = OPTIONS.p || OPTIONS.push;
OPTIONS.commit  = OPTIONS.c || OPTIONS.commit;
OPTIONS.publish = OPTIONS.P || OPTIONS.publish;
OPTIONS.dryrun  = OPTIONS.d || OPTIONS.dryrun;

if (OPTIONS.upgrade === true) {
	OPTIONS.upgrade = 'patch';
}
else if (typeof OPTIONS.upgrade == 'number') {
	OPTIONS.version = OPTIONS.upgrade + '.0';
	OPTIONS.upgrade = true;
}
else if (OPTIONS.upgrade) {
	if (semver.valid(OPTIONS.upgrade)) {
		OPTIONS.version = OPTIONS.upgrade;
		OPTIONS.upgrade = true;
	}
	else {
		var name = OPTIONS.upgrade.toLowerCase();
		if ([ 'major', 'minor', 'patch' ].indexOf(name) < 0) {
			OPTIONS.prereleaseName = OPTIONS.upgrade;
			OPTIONS.upgrade = 'prerelease';
		}
	}
}

if (typeof OPTIONS.push == 'string') {
	OPTIONS.pushRemote = OPTIONS.push;
	OPTIONS.push = true;
}

module.exports = OPTIONS;

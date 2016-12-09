var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')

	/* NPM */
	, minimist = require('minimist')
	, semver = require('semver')
	, ajv = new require('ajv')()

	/* in-package */
	, logger = require('./logger')
	;

var OPTIONS = minimist(process.argv.slice(2));

OPTIONS.path = OPTIONS.path
	? path.resolve(OPTIONS.path)
	: process.cwd();

if (!fs.existsSync(OPTIONS.path)) {
	logger.error('Package does not exists at: _' + OPTIONS.path + '_');
	process.exit(40);
}

var yuppPathname = path.join(OPTIONS.path, 'yupp.json');
if (fs.existsSync(yuppPathname)) {
	var json = {};
	try {
		json = JSON.parse(fs.readFileSync(yuppPathname));
	} catch(ex) {
		logger.error('*yupp.json* is not a valid JSON file.');
		process.exit(41);
	}

	var schema = require('../yupp.schema');
	var validate = ajv.compile(schema);
	if (!validate(json)) {
		logger.error('*yupp.json* does not conform to yupp.schema.');
		logger.info('For details see https://github.com/YounGoat/nodejs.npm-release#about-yuppjson')
		process.exit(41);
	}

	OPTIONS.config = json;

}
else {
	OPTIONS.config = {};
}

OPTIONS.ver     = OPTIONS.v;
OPTIONS.help    = OPTIONS.h || OPTIONS.help;

OPTIONS.upgrade = OPTIONS.u || OPTIONS.upgrade;
OPTIONS.push    = OPTIONS.p || OPTIONS.push;
OPTIONS.commit  = OPTIONS.c || OPTIONS.commit;
OPTIONS.publish = OPTIONS.P || OPTIONS.publish;
OPTIONS.dryrun  = OPTIONS.d || OPTIONS.dryrun || OPTIONS['dry-run'];

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

#!/usr/bin/env node

var MODULE_REQUIRE
	, fs = require('fs')
	, os = require('os')
	, path = require('path')
	/* in-package */
	, logger = require('../util/logger')
	, runner = require('../util/runner')
	, OPTIONS = require('../util/options')
	;

// ---------------------------
// 检查系统命令。
var cmd, response;

response = runner('git --version');
if (response.error) {
	logger.error('System command *git* NOT FOUND.');
	process.exit(1);
}
logger.info('Git client found.');

response = runner('git status', OPTIONS.path);
if (response.error) {
	logger.warn('Not a git repository: _' + OPTIONS.path + '_');
	runner('git init', OPTIONS.path);
	logger.info('Git repository initiated.');
}
else {
	logger.info('Git repository found.');
}

var pathname = path.join(OPTIONS.path, '.gitignore');
var text = '', found = false;
if (fs.existsSync(pathname)) {
	text = fs.readFileSync(pathname, { encoding: 'utf8' });
	var lines = text.split(/(\r|\n)+/);
	for (var i = 0, line; i < lines.length; i++) {
		line = lines[i].trim();
		if (line == 'node_modules') {
			found = true;
			break;
		}
	}
}
if (!found) {
	text += [ '', '# Added by yuan-npm-release, ' + new Date, 'node_modules' ].join('\n');
	fs.writeFileSync(pathname, text);
}
logger.info('node_modules ignored.');

runner('git add .gitignore && git add *', OPTIONS.path); 
runner('git commit -m "Auto committed by yuan-npm-release"', OPTIONS.path);
logger.info('Committed to local repository.');

var pathname = path.join(OPTIONS.path, 'package.json');
if (!fs.existsSync(pathname)) {
	logger.warn('_package.json_ NOT FOUND in _' + OPTIONS.path + '_');
	process.exit(41);
}
var pkgJson = require(pathname);
runner('git tag ' + pkgJson.version, OPTIONS.path);
logger.info('Repository tag added.');

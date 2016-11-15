#!/usr/bin/env node
'use strict';

var MODULE_REQUIRE
	, OPTIONS = require('./util/options')
	;

var COMMAND_NAME = 'yuan-npm-release';

var command;
if (OPTIONS.h || OPTIONS.help) {
	require('./command/help');
	process.exit(0);
}

if (OPTIONS.upgrade) {
	require('./command/upgrade');
}

if (OPTIONS.commit) {
	require('./command/commit');
}

if (OPTIONS.push) {
	require('./command/push');
}

if (OPTIONS.publish) {
	require('./command/publish');
}

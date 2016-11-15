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

require('./command/upgrade');
require('./command/push');
require('./command/publish');

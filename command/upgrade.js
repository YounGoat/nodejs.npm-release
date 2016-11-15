var MODULE_REQUIRE
	/* built-in */
	, fs = require('fs')
	, path = require('path')

	/* npm */
	, semver = require('semver')

	/* in-package */
	, logger = require('../util/logger')
	, OPTIONS = require('../util/options')
	;

if (!OPTIONS.upgrade) {
	OPTIONS.upgrade = 'patch';
}

// ---------------------------
// 检查系统命令。
var cmd, response;

// ---------------------------
// 检查 package.json 是否存在。

var pathname = path.join(OPTIONS.path, 'package.json');
if (!fs.existsSync(pathname)) {
	logger.error('_package.json_ NOT FOUND in _' + OPTIONS.path + '_');
	process.exit(41);
}

// 加载 package.json 备用。
var pkgJson = require(pathname);
if (OPTIONS.version) {
	pkgJson.version = OPTIONS.version;
}
else {
	pkgJson.version = semver.inc(pkgJson.version, OPTIONS.upgrade, OPTIONS.prereleaseName);
}

fs.writeFileSync(pathname, JSON.stringify(pkgJson, null, 4), 'utf8');
logger.info('Package upgraded to *' + pkgJson.version + '*.');

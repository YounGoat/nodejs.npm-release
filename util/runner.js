var MODULE_REQUIRE
	, child_process = require('child_process')
	, os = require('os')
	;

module.exports = function(cmd, cwd) {
	var response = { error: null };
	try {
		var stdout = child_process.execSync(cmd, { cwd: cwd, stdio: [ null, null, null ] });
		response.lines = stdout.toString().split(os.EOL);
	} catch (e) {
		response.error = e;
	}
	return response;
};

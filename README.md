#	yuan-npm-release, UPP

Are you tired with commit, push and publish? When you wanna upgrade your NPM package, this tool will help you finishing all works necessary with only one command.

![help](./doc/help.png)

```
NAME
  yuan-npm-release - Change version, push to remote and publish to registry.
  upp - Short name, means U(pgrade), P(ush) and P(ublish).

SYNOPSIS
  yuan-npm-release -h | --help
  Show this help info.

  yuan-npm-release -u | --upgrade [ major | minor | patch | prerelease-name | semantic-version ]
  Upgrade the package version.

  yuan-npm-release -c | --commit
  Commit to local Git repository.

  yuan-npm-release -p | --push [ remote-name ]
  Push to remote Git repository.
  Before push, commit will be run firstly.

  yuan-npm-release -P | --publish
  Publish to NPM registry.

  upp
  Equals to yuan-npm-release --upgrade --push --publish.
  Options --push and --publish also supported if you wanna specify version and remote repository.

OTHER OPTIONS
  --path
    By default, yuan-npm-release regard the current working dir as the package's
    homedir. You may change the CWD by --path parameter.

RELEASE STEPS
  1. Update CHANGELOG.md by hand
  2. Update package.json version field
  3. Add and commit, and tag with version git
  4. Push to remote git
  5. NPM publish npm
```

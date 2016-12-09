See [CHANGE LOG](./CHANGELOG.md) for notable changes.

#	Yuan-NPM-Release, YUPP

Are you tired with commit, push and publish? When you wanna upgrade your NPM package, this tool will help you finishing all works necessary with only one command.

![help](./doc/help.png)  
See [help.txt](./help.txt) if the previous image not downloaded.

##	About yupp.json

*yupp.json* is used to store meta info which is not supported by *package.json* and will be used by *yuan-npm-release*, e.g. package alias. It should be like this:
```javascript
{
	"name": "yuan-npm-release",
	"alias": "yupp"
}
```

If __alais__ set, *yuan-npm-release* will try to publish a renamed copy to NPM registry.

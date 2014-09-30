Screenliner
===

### example usage:

```js
var Screenliner = require('screenliner');
var screenliner = new Screenliner();
var Promise = require('bluebird');

var repeat = function(str, times) {
  return new Array(times + 1).join(str);
};

var lineStr = new Array(screenliner.width + 1).join('-');

screenliner.createRegion(lineStr);
var top = screenliner.createRegion();
screenliner.createRegion(lineStr);
var middle = screenliner.createRegion()
screenliner.createRegion(lineStr);
var bottom = screenliner.createRegion();
screenliner.createRegion(lineStr);

var sleep = function(ms) {
	return new Promise(function(res) { setTimeout(res, ms); });
}

sleep(1000).then(function() {
	top.print('This is top');
	return sleep(1000)
}).then(function() {
	middle.print('This is middle');
	return sleep(500)
}).then(function() {
	bottom.print('This is bottom');
	return sleep(500)
})

.then(function() {
	// done!
})
```

Outputs finally:

```
$ node example.js
--------------------------------------------------------------------------------
This is top
--------------------------------------------------------------------------------
This is middle
--------------------------------------------------------------------------------
This is bottom
--------------------------------------------------------------------------------
```


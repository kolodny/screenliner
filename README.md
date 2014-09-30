Screenliner
===

### example usage:

```js
var Screenliner = require('screenliner');
var screenliner = new Screenliner();

var top = screenliner.registerRegion(80);
var middle = screenliner.registerRegion(80, 2);
var bottom = screenliner.registerRegion(80, 3);

screenliner.printRegion(top, 'top region');

setTimeout(function() {
  screenliner.printRegion(top, 'er', 3);
}, 400)

setTimeout(function() {
  screenliner.printRegion(middle, 'middle');
}, 800)
setTimeout(function() {
  screenliner.printRegion(bottom, 'bottom');
}, 1200)
setTimeout(function() {
  screenliner.printRegion(middle, 'also middle')
  screenliner.printRegion(middle, 'look, another middle', null, 1); // middle is two lines
}, 1600)

```
var extend = require('./extend.js');

var internalWrite = {};

module.exports = Screenliner;

function Screenliner(options) {
  var self = this;
  self.options = {};
  extend(self.options, options, {
    stream: process.stdout,
    width: 1,
    height: 1,
    clip: true,
  });
  var stream = self.options.stream;
  var metrics = stream.getWindowSize();
  self.width = metrics[0];
  self.height = metrics[1];

  self.lines = [];

  var oldWrite = stream.write;
  stream.write = function(command, string) {
    if (command === internalWrite) {
      return oldWrite.call(this, string);
    } else {
      var lines = command.toString().split('\n');
      if (!self.lines.length) {
        self.lines = self.lines.concat(lines);
      } else {
        self.lines[self.lines.length - 1] += lines[0];
        self.lines = self.lines.concat(lines.slice(1));
      }
      return oldWrite.apply(this, arguments);
    }
  }
}

Screenliner.prototype.createRegion = function(options) {
  var self = this;
  options = options || {};
  extend(options, {
    width: 1,
    height: 1,
    clip: true
  });
  var top = self.lines.length;
  for (var i = 0; i < options.height; i++) {
    self.options.stream.write('\n');
    self.lines.push('');
  }
}

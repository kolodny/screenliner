function Screenliner(stream) {
  stream = stream || process.stdout;
  this.stream = stream;
  this.regions = [];
  this.lines = [];
  this.metrics = stream.getWindowSize();
}

Screenliner.prototype.registerRegion = function(width, height) {
  height = height || 1;
  var region = {
    height: height,
    top: this.lines.length
  };
  for (var i = 0; i < height; i++) {
    this.stream.write('\n');
    this.lines.push('');
  }
  return this.regions.push(region) - 1;
};

Screenliner.prototype.printRegion = function(regionId, text, xStart, yStart) {
  var region = this.regions[regionId];
  yStart = yStart || 0;
  var lineNumber = region.top + yStart;
  var keepLine;

  if (xStart === true) {
    keepLine = true;
    xStart = this.lines[lineNumber].length;
  } else {
    xStart = xStart || 0;
  }

  this.stream.cursorTo(0);
  this.stream.moveCursor(xStart, (region.top - this.lines.length) + yStart);
  if (!keepLine) {
    this.stream.clearLine(1);
  }
  this.stream.write(text);
  this.lines[lineNumber] = this.lines[lineNumber].slice(0, xStart) + text;
  this.stream.moveCursor(0, (this.lines.length - region.top) - yStart);
};

module.exports = Screenliner;

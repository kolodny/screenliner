function Screenliner(stream) {
  stream = stream || process.stdout;
  this.stream = stream;
  this.regions = [];
  this.lines = [];
  var metrics = stream.getWindowSize();
  this.width = metrics[0];
  this.height = metrics[1];
};

Screenliner.prototype.getScreenState = function() {
  return this.lines.slice();
};

Screenliner.prototype.createRegion = function(width, height, str) {
  var self = this;
  if (typeof width === 'string') {
    str = width;
    width = 1;
    height = 1;
  }
  height = height || 1;
  var top = self.lines.length
  var region = {
    height: height,
    top: self.lines.length
  };
  for (var i = 0; i < height; i++) {
    self.stream.write('\n');
    self.lines.push('');
  }
  
  var region = {
    print: function(text, xStart, yStart, keepLine) {
      yStart = yStart || 0;
      var appendToLine;
      var lineNumber = top + yStart;

      if (xStart === true) {
        appendToLine = true;
        xStart = self.lines[lineNumber].length;
      } else {
        xStart = xStart || 0;
      }
      self.stream.moveCursor(xStart, (top - self.lines.length) + yStart);
      if (!keepLine && !appendToLine) {
        self.stream.clearLine(1);
      }
      if (typeof text === 'function') {
        text = text(self.lines[lineNumber]);
      }
      self.stream.write(text);
      self.lines[lineNumber] = self.lines[lineNumber].slice(0, xStart) + text;
      self.stream.moveCursor(0, (self.lines.length - top) - yStart);
      self.stream.cursorTo(0);
    },
    replace: function(find, replace, xStart, yStart, keepLine) {
      return region.print(function(currentLine) {
        return currentLine.replace(find, replace);
      }, xStart, yStart, keepLine);
    }
  };

  var regionId = self.regions.push(region) - 1;
  region.id = regionId;

  if (str) {
    region.print(str);
  }

  return region
}


module.exports = Screenliner;

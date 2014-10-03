module.exports = extend;

function extend(base) {
  for (var i = 1; i < arguments.length; i++) {
    var extender = arguments[i];
    for (var j in extender) {
      if (!(j in base)) {
        base[j] = extender[j];
      }
    }
  }
}

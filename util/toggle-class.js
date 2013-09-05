// Generated by CoffeeScript 1.4.0
(function() {
  var toggleClass,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  toggleClass = function(element, className, condition) {
    var classList, contained;
    classList = element.className.split(/\s+/);
    contained = __indexOf.call(classList, className) >= 0;
    if (condition == null) {
      condition = !contained;
    }
    condition = !!condition;
    if (!contained && condition === true) {
      classList.push(className);
    }
    if (contained && condition === false) {
      classList.splice(classList.indexOf(className), 1);
    }
    element.className = classList.join(' ');
    return null;
  };

  module.exports = toggleClass;

}).call(this);
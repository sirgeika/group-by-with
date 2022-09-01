'use strict';

module.exports = function(target, value, key) {
  target[key] = target[key] || 0;
  target[key] += (value || 0);
};
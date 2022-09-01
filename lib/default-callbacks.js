'use strict';

const rowCallback = function(target, value, key) {
  target[key] = target[key] || [];
  target[key].push((value || 0));
};

const totalCallback = function(value) {
  return value;
};

module.exports = {
  rowCallback,
  totalCallback
};
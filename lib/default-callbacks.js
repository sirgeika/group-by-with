'use strict';

const rowCallback = function(previousValue, currentValue) {
  previousValue = previousValue|| [];
  previousValue.push((currentValue || 0));
  return previousValue;
};

const totalCallback = function(value) {
  return value;
};

module.exports = {
  rowCallback,
  totalCallback
};
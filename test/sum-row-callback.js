'use strict';

module.exports = function(previousValue, currentValue) {
  return (previousValue || 0) + (currentValue || 0);
};
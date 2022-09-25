'use strict';

module.exports = function(callback, keys = '', defaultCallback) {
  const keyArr = keys.split(',').map(function(k) {
    return k.trim();
  });

  if (typeof callback === 'function') {
    return keyArr.reduce(function(result, key) {
      result[key] = callback;
      return result;
    }, {});
  }

  if (typeof callback === 'object') {
    return keyArr.reduce(function(result, key) {
      result[key] = callback[key] || defaultCallback;
      return result;
    }, {});
  }

  return {};
};
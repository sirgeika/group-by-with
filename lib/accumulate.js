'use strict';

module.exports = (target={}, source, callback) => {
  for (let [ key, value ] of Object.entries(source)) {
    if (typeof value !== 'number') {
      value = parseInt(value, 10);
    }
    target[key] = callback(target[key], value, key);
  }
  return target;
};
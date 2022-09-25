'use strict';

module.exports = (target={}, source, callbacks) => {
  for (let [ key, value ] of Object.entries(source)) {
    if (typeof value !== 'number') {
      value = parseInt(value, 10);
    }
    target[key] = callbacks[key](target[key], value, key);
  }
  return target;
};
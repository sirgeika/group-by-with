'use strict';

const pick = require('./lib/pick');
const accumulate = require('./lib/accumulate');

const defaultCallbacks = require('./lib/default-callbacks');
const defaultRowCalculator = defaultCallbacks.rowCallback;
const defaultTotalCalculator = defaultCallbacks.totalCallback;

const validateIntersection = function(props1, props2) {
  if (props2) {
    const arr1 = props1.split(',');
    const arr2 = props2.split(',');

    let intersected;
    const hasIntersection = arr2.some((s) => {
      intersected = s;
      return arr1.indexOf(s) >= 0;
    });

    if (hasIntersection) {
      throw new Error(`Column list should not intersect: ${intersected}`);
    }
  }
};

const validateParams = function(array, groupedProps, sumProps) {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an Array');
  }

  if (!groupedProps) {
    throw new Error('Argument "groupedProps" must be present');
  }

  if (typeof groupedProps !== 'string') {
    throw new TypeError('Argument "groupedProps" must be a string');
  }

  if (sumProps && typeof sumProps !== 'string') {
    throw new TypeError('Argument "sumProps" must be a string');
  }

  validateIntersection(groupedProps, sumProps);
};

/**
 * Collapses an array of objects at the specified object properties
 *
 * @param { object } { rowCalculator, totalCalculator } - callbacks for handling array
 * @return { function } that collapses an array of objects using given callbacks
   * @param {array} array - initial array of objects
   * @param {string} groupedProps - grouping properties
   * @param {string} calcProps - calculation properties
   * @param {function} keyFn - additional function to transform keys
   * @returns {[]} - array of objects
 */

module.exports = function({
    rowCalculator = defaultRowCalculator,
    totalCalculator = defaultTotalCalculator
  }={}
) {

  return function(array, groupedProps, calcProps, keyFn=JSON.stringify) {

    if (typeof calcProps === 'function') {
      [ keyFn, calcProps ] = [ calcProps, '' ];
    }

    validateParams(array, groupedProps, calcProps);

    const map = new Map();

    for (const elem of array) {
      const groupedValues = pick(elem, groupedProps);
      const calculatedValues = pick(elem, calcProps);

      const key = keyFn(groupedValues);

      const [, calculated] = map.get(key) || [];
      const newCalculated = accumulate(
        calculated,
        calculatedValues,
        rowCalculator
      );
      map.set(key, [ groupedValues, newCalculated ]);
    }

    const result = [];
    map.forEach((value) => {
      const [ grouped, calc ] = value;
      const calculated = {};

      for (let [ key, value ] of Object.entries(calc)) {
        calculated[key] = totalCalculator(value, key);
      }

      result.push({...grouped, ...calculated});
    });
    return result;
  };
};
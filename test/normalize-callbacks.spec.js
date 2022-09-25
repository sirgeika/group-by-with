'use strict';

const chai = require('chai');
const expect = chai.expect;

const normalizeCallbacks = require('../lib/normalize-callbacks');

describe('Test normalization of callbacks', function() {
  const callback = function() {};

  it('Normalize function', function() {
    const result = normalizeCallbacks(callback, 'who, money');
    expect(result).to.deep.equal({
      who: callback,
      money: callback
    });
  });

  it('Normalize object', function() {
    const callbacks = {
      who: callback,
      money: callback
    };

    const result = normalizeCallbacks(callbacks, 'who, money');
    expect(result).to.deep.equal({
      who: callback,
      money: callback
    });
  });

  it('Normalize object with default', function() {
    const callbacks = {
      who: callback,
      money: callback
    };

    const defaultCallback = function() {};

    const result = normalizeCallbacks(callbacks, 'who, money, weight', defaultCallback);
    expect(result).to.deep.equal({
      who: callback,
      money: callback,
      weight: defaultCallback
    });
  });

  it('Normalize object without default', function() {
    const callbacks = {
      who: callback,
      money: callback
    };

    const result = normalizeCallbacks(callbacks, 'who, money, weight');
    expect(result).to.deep.equal({
      who: callback,
      money: callback,
      weight: undefined
    });
  });

  it('Normalize object with more callbacks then need', function() {
    const callbacks = {
      who: callback,
      money: callback
    };

    const result = normalizeCallbacks(callbacks, 'who');
    expect(result).to.deep.equal({
      who: callback
    });
  });
});
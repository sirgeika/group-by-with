'use strict';

const chai = require('chai');
const expect = chai.expect;
const groupBy = require('../index');

describe('Test callbacks as objects', function() {
  const arr = [
    {
      name: 'Vasya',
      who: 'man',
      money: 100,
      age: 23,
      children: 1
    },
    {
      name: 'Vasya',
      who: 'man',
      money: 263,
      age: 29,
      children: 2
    },
    {
      name: 'Kolya',
      who: 'man',
      money: 98,
      age: 43,
      children: 3
    },
    {
      name: 'Katya',
      who: 'woman',
      money: 290,
      age: 67,
      children: 2
    },
    {
      name: 'Olya',
      who: 'woman',
      money: 5,
      age: 55,
      children: 3
    }
  ];

  it('Row', function() {
    const groupByWith = groupBy({
      rowCalculator: {
        money: function(target, value, key) {
          // sum
          target[key] = target[key] || 0;
          target[key] += (value || 0);
        },
        children: function(target, value, key) {
          // sum of squares
          target[key] = target[key] || 0;
          target[key] += (value * value || 0);
        }
      }
    });

    const result = groupByWith(arr, 'who', 'money, children');

    expect(result).to.deep.equal([
      {
        who: 'man',
        money: 461,
        children: 14
      },
      {
        who: 'woman',
        money: 295,
        children: 13
      }
    ]);
  });
});
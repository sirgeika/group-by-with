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
      age: 44,
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
        money: function(previousValue, currentValue) {
          // sum
          return (previousValue || 0) + (currentValue || 0);
        },
        children: function(previousValue, currentValue) {
          // sum of squares
          const normalizedValue = (currentValue || 0);
          return (previousValue || 0) + normalizedValue * normalizedValue;
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

  it('Total', function() {
    const groupByWith = groupBy({
      totalCalculator: {
        money: function(values = []) {
          // sum
          return values.reduce(function(sum, value) {
            return sum + value;
          }, 0);
        },
        children: function(values = []) {
          // max
          return values.reduce(function(res, value) {
            return Math.max(res, value);
          }, 0);
        },
        age: function(values = []) {
         // average
         const all = values.reduce(function(sum, value) {
           return sum + value;
         }, 0);
         return all / values.length;
        }
      }
    });

    const result = groupByWith(arr, 'who', 'money, children, age');
    expect(result).to.deep.equal([
      {
        who: 'man',
        money: 461,
        children: 3,
        age: 32
      },
      {
        who: 'woman',
        money: 295,
        children: 3,
        age: 61
      }
    ])
  });
});
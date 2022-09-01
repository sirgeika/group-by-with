'use strict';

const chai = require('chai');
const expect = chai.expect;
const groupBy = require('../index');
const sumRowCallback = require('./sum-row-callback');

describe('Test sum', function() {

  const arr = [
    {
      name: 'Vasya',
      who: 'man',
      money: 100,
      weight: 80
    },
    {
      name: 'Vasya',
      who: 'man',
      money: 263,
      weight: 90
    },
    {
      name: 'Kolya',
      who: 'man',
      money: 98,
      weight: 76
    },
    {
      name: 'Katya',
      who: 'woman',
      money: 290,
      weight: 81
    },
    {
      name: 'Olya',
      who: 'woman',
      money: 5,
      weight: 99
    }
  ];

  it('Without callbacks', function() {
    const groupByWithNothing = groupBy();
    const result = groupByWithNothing(arr, 'who', 'money');

    expect(result).to.deep.equal([
      {
        who: 'man',
        money: [ 100, 263, 98 ]
      },
      {
        who: 'woman',
        money: [ 290, 5 ]
      }
    ]);
  });

  it('Test sum with row callback', function() {
    const groupByWithSum = groupBy({
      rowCalculator: sumRowCallback
    });

    const result = groupByWithSum(arr, 'who', 'money');

    expect(result).to.deep.equal([
      {
        who: 'man',
        money: 461
      },
      {
        who: 'woman',
        money: 295
      }
    ]);
  });

  it('Test sum with total callback', function() {
    const groupByWithSum = groupBy({
      totalCalculator: function(value) {
        return value.reduce(function(sum, v) {
          return sum + v;
        }, 0);
      }
    });

    const result = groupByWithSum(arr, 'who', 'money');

    expect(result).to.deep.equal([
      {
        who: 'man',
        money: 461
      },
      {
        who: 'woman',
        money: 295
      }
    ]);
  });

  it('With different calculations', function() {
    const groupByWithSumAvg = groupBy({
      rowCalculator: function(target, value, key) {
        if (key === 'money') {
          target[key] = target[key] || 0;
          target[key] += (value || 0);
        } else {
          target[key] = target[key] || [];
          target[key].push((value || 0));
        }
      },
      totalCalculator: function(value, key) {
        if (key === 'weight') {
          const total = value.reduce(function(sum, val) {
            return sum + val;
          }, 0);
          return total / value.length;
        }
        return value;
      }
    });

    const result = groupByWithSumAvg(arr, 'who', 'money, weight');

    expect(result).to.deep.equal([
      {
        who: 'man',
        money: 461,
        weight: 82
      },
      {
        who: 'woman',
        money: 295,
        weight: 90
      }
    ]);
  });
});
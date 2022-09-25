'use strict';

const chai = require('chai');
const expect = chai.expect;
const groupBy = require('../index');

describe('Collapse arrays with concat strings', function() {
  const arr = [
    { name: 'Vasya', who: 'man', money: '100' },
    { name: 'Vasya', who: 'man', money: '263' },
    { name: 'Kolya', who: 'man', money: '98' },
    { name: 'Katya', who: 'woman', money: '290' },
    { name: 'Olya', who: 'woman', money: '5' }
  ];

  it('Concat strings', function() {
    const groupByWithConcat = groupBy({
      rowCalculator: {
        money: function(previousValue, currentValue) {
          if (currentValue && previousValue) {
            return [ previousValue, currentValue ].join('-');
          }
          if (currentValue) {
            return currentValue;
          }
          return previousValue;
        }
      }
    });

    const result = groupByWithConcat(arr, 'who', 'money');
    expect(result).to.deep.equal([
      { who: 'man', money: '100-263-98' },
      { who: 'woman', money: '290-5' }
    ]);
  });
});
Factory for collapsing an array of objects with specified callbacks.

```bash
npm install group-by-with
```

#### We can group with summarize properties
```js
const groupBy = require('group-by-with');

const arr = [
  { name: 'Vasya', who: 'man', money: 100, weight: 10 },
  { name: 'Vasya', who: 'man', money: 263, weight: 20 },
  { name: 'Kolya', who: 'man', money: 98, weight: 30 },
  { name: 'Katya', who: 'woman', money: 290, weight: 40 },
  { name: 'Olya', who: 'woman', money: 5, weight: 15 }
];

// use rowCallback
const groupByWithSum = groupBy({
  rowCalculator: function(target, value, key) {
    target[key] = target[key] || 0;
    target[key] += (value || 0);
  }
});

const res = groupByWithSum(arr, 'who', 'money, weight');
/* [
    { who: 'man', money: 461, weight: 60 },
    { who: 'woman', money: 295, weight: 55 }
  ]
*/

// use totalCallback
const groupByWithSum = groupBy({
  totalCalculator: function(value/*, key*/) {
    return value.reduce(function(sum, v) {
      return sum + v;
    }, 0);
  }
});

const res = groupByWithSum(arr, 'who', 'money, weight');
/* [
    { who: 'man', money: 461, weight: 60 },
    { who: 'woman', money: 295, weight: 55 }
  ]
*/
```

groupByWith expects an object with optional callbacks:
```js
groupBy({
  rowCalculator: function(target, value, key){}, // callback to process row
  totalCalculator: function(value, key){}, // callback to process final results
})
```
and returns a function with params:
```js
fn(array, groupedProps, calcProps, keyFn=JSON.stringify)
```
More cases of using this function:  https://github.com/sirgeika/group-by-with-sum 
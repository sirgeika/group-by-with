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
```
### v2
```js
// use rowCallback as a function
const groupByWithSum = groupBy({
  rowCalculator:function(previousValue, currentValue, key) {
    if (key === 'weight') {
      return (previousValue || 0) + (currentValue || 0);  
    }
    return currentValue;
  }
});

// or as an object
const groupByWithSum = groupBy({
  rowCalculator: {
    money: function(previousValue, currentValue) {
      return (previousValue || 0) + (currentValue || 0);
    }
  }
});

const res = groupByWithSum(arr, 'who', 'money, weight');
/* [
    { who: 'man', money: 461, weight: 60 },
    { who: 'woman', money: 295, weight: 55 }
  ]
*/
```

#### Concat strings
```js
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
/* [
     { who: 'man', money: '100-263-98' },
     { who: 'woman', money: '290-5' }
  ]
*/
```

v2 groupByWith expects an object with optional callbacks:
```ts
groupBy({
  rowCalculator:
      (function(previousValue: any, currentValue: any, key: string): number) |
      { 
        "<nameOfProp>": function(previousValue: any, currentValue: any): number
      }, // callback to process row
  totalCalculator: function(value: any, key: string): any, // callback to process final results
})
```

### v1
```js
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

v1 groupByWith expects an object with optional callbacks:
```ts
groupBy({
  rowCalculator: function(target: object, value: any, key: string): void, // callback to process row
  totalCalculator: function(value: any, key: string): any, // callback to process final results
})
```
and returns a function with params:
```js
fn(array, groupedProps, calcProps, keyFn=JSON.stringify)
```
More cases of using this function:  https://github.com/sirgeika/group-by-with-sum 
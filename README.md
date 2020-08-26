# pagination

Stop using pagination 1 2 3 4 5 6...

use pagination 1 2 4 8 16... right now !

# Online Demo

https://codesandbox.io/s/paginationdemo-jvgcv?file=/src/App.vue

## Install

`yarn add @cromarmot/pagination`

## Usage

```js
import {Pagination} from '@cromarmot/pagination';
const pm = new Pagination();

console.log(pm.setRange(1, 1000, 1));

console.log(pm.setRangeCurrent(1, 100, 50));
```

## APIs

`current()`

`setRange(rangeStartInteger,rangeEndInteger,rangeCurrentInteger)`

`setRangeCurrent(rangeCurrentInteger)`

`setArray(any[],index)`

`setArrayIndex(index)`

## Test

`yarn test`

# Examples/Demo

https://atcoder.jp/ranking




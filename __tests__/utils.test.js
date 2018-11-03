import {uniq, flattenDeep} from '../src/utils';

test('uniq', () => {
  expect(uniq([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
});

test('flattenDeep', () => {
  expect(flattenDeep([1, [2, [3]]])).toEqual([1, 2, 3]);
});

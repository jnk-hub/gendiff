import {uniq} from './utils';

const getTypeAndValue = (key, left, right) => {
  switch (true) {
    case left[key] instanceof Object && right[key] instanceof Object:
      return {type: 'nested', value: null};
    case !Object.keys(right).includes(key):
      return {type: 'removed', value: left[key]};
    case !Object.keys(left).includes(key):
      return {type: 'added', value: right[key]};
    case left[key] !== right[key]:
      return {type: 'updated', value: [left[key], right[key]]};
    case left[key] === right[key]:
      return {type: 'equal', value: left[key]};
    default:
      return {};
  }
};

const getUniqKeys = (...objects) =>
  uniq(objects.reduce((acc, object) => [...acc, ...Object.keys(object)], []));

const calcDiff = (left, right) =>
  getUniqKeys(left, right).map((key) => {
    const {type, value} = getTypeAndValue(key, left, right);
    const children = type === 'nested' ? calcDiff(left[key], right[key]) : null;
    return type && {type, key, value, children};
  });

export default calcDiff;

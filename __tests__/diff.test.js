import calcDiff from '../src/diff';

test('nested', () => {
  const left = {key: {}};
  const right = {key: {}};
  expect(calcDiff(left, right)).toContainEqual({
    type: 'nested',
    key: 'key',
    value: null,
    children: [],
  });
});

test('delete', () => {
  const left = {key: 'val'};
  const right = {};
  expect(calcDiff(left, right)).toContainEqual({
    type: 'removed',
    key: 'key',
    value: 'val',
    children: null,
  });
});

test('added', () => {
  const left = {};
  const right = {key: 'val'};
  expect(calcDiff(left, right)).toContainEqual({
    type: 'added',
    key: 'key',
    value: 'val',
    children: null,
  });
});

test('updated', () => {
  const left = {key: 'left'};
  const right = {key: 'right'};
  expect(calcDiff(left, right)).toContainEqual({
    type: 'updated',
    key: 'key',
    value: ['left', 'right'],
    children: null,
  });
});

test('equal', () => {
  const left = {key: 'val'};
  const right = {key: 'val'};
  expect(calcDiff(left, right)).toContainEqual({
    type: 'equal',
    key: 'key',
    value: 'val',
    children: null,
  });
});

test('comlex', () => {
  const left = {
    nested: {
      nested: {
        key: 'val',
      },
      removed: 'removed',
      updated: {},
    },
  };
  const right = {
    nested: {
      nested: {
        key: 'val',
      },
      added: 'added',
      updated: 'val',
    },
  };
  expect(calcDiff(left, right)).toContainEqual({
    type: 'nested',
    key: 'nested',
    value: null,
    children: [
      {
        type: 'nested',
        key: 'nested',
        value: null,
        children: [{type: 'equal', key: 'key', value: 'val', children: null}],
      },
      {
        type: 'removed',
        key: 'removed',
        value: 'removed',
        children: null,
      },
      {
        type: 'updated',
        key: 'updated',
        value: [{}, 'val'],
        children: null,
      },
      {type: 'added', key: 'added', value: 'added', children: null},
    ],
  });
});

import format from '../src/formatDiff/formatter';

test('invalid format', () => {
  const received = () => format('invalid_format', {});
  const expected = new Error('format invalid_format no support');
  expect(received).toThrow(expected);
});

test('invalid data', () => {
  const received = () => format('json', 'invalid_data');
  const expected = new Error('failed to format data');
  expect(received).toThrow(expected);
});

import parse from '../src/parser';

test('invalid format', () => {
  const received = () => parse('invalid_format', {});
  const expected = new Error('format invalid_format no support');
  expect(received).toThrow(expected);
});

test('invalid data', () => {
  const received = () => parse('json', 'invalid_data');
  const expected = new Error('failed to parse data');
  expect(received).toThrow(expected);
});

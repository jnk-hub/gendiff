import {resolve} from 'path';
import {readFileSync} from 'fs';
import cli from '../src/formatDiff';

const getFixturePath = (fixture) => resolve(__dirname, '__fixtures__', fixture);

describe('format diff', () => {
  ['string', 'plain', 'json'].map((outputFormat) => {
    let expected;
    beforeEach(() => {
      expected = readFileSync(getFixturePath(`result.${outputFormat}`), 'utf8');
    });
    return ['json', 'yaml', 'ini'].forEach((format) => {
      test(`${format} format`, async () => {
        const left = getFixturePath(`left.${format}`);
        const right = getFixturePath(`right.${format}`);
        const received = await cli(left, right, outputFormat);
        expect(received).toBe(expected);
      });
    });
  });
});

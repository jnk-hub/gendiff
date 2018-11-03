import {flattenDeep} from '../../utils';

const SPACE_LENGTH = 2;
const META_SIMBOL_LENGTH = 2;

const space = (count) => ' '.repeat(count);

const normalizeValue = (value, spaceCount) => {
  if (value instanceof Object) {
    return [
      '{',
      ...Object.keys(value).map(
        (key) =>
          `${space(spaceCount + SPACE_LENGTH + META_SIMBOL_LENGTH)}  ${key}: ${
            value[key]
          }`,
      ),
      `${space(spaceCount)}  }`,
    ].join('\n');
  }
  return value;
};

const proc = (diff, spaceCount) =>
  diff.map(({type, key, value, children}) => {
    switch (type) {
      case 'nested':
        return [
          `${space(spaceCount)}  ${key}: {`,
          ...proc(children, spaceCount + SPACE_LENGTH + META_SIMBOL_LENGTH),
          `${space(spaceCount)}  }`,
        ];
      case 'removed':
        return `${space(spaceCount)}- ${key}: ${normalizeValue(
          value,
          spaceCount,
        )}`;
      case 'added':
        return `${space(spaceCount)}+ ${key}: ${normalizeValue(
          value,
          spaceCount,
        )}`;
      case 'updated': {
        const [from, to] = value;
        return proc(
          [
            {type: 'removed', key, value: from},
            {type: 'added', key, value: to},
          ],
          spaceCount,
        );
      }
      case 'equal':
        return `${space(spaceCount)}  ${key}: ${value}`;
      default:
        throw new Error(`no support for ${type} type`);
    }
  });

export default (diff) =>
  ['{', ...flattenDeep(proc(diff, SPACE_LENGTH)), '}'].join('\n');

const normalizeValue = (value) =>
  value instanceof Object ? 'complex value' : `'${value}'`;

const toPlain = (diff) =>
  diff
    .map(({type, key, value, children}) => {
      switch (type) {
        case 'nested':
          return toPlain(
            children.map((child) => ({
              ...child,
              key: `${key}.${child.key}`,
            })),
          );
        case 'removed':
          return `Property :${key} was removed`;
        case 'added':
          return `Property :${key} was added with ${normalizeValue(value)}`;
        case 'updated': {
          const [from, to] = value;
          return `Property :${key} was updated. From ${normalizeValue(
            from,
          )} to ${normalizeValue(to)}`;
        }
        case 'equal':
          return `Property :${key} not change. ${value}`;
        default:
          throw new Error(`no support for ${type} type`);
      }
    })
    .join('\n');

export default toPlain;

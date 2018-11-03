const proc = (diff) =>
  diff.reduce((acc, {type, key, value, children}) => {
    if (type === 'nested') {
      const val = {...acc[type], [key]: {...proc(children)}};
      return {...acc, [type]: val};
    }
    const val = type === 'updated' ? value[1] : value;
    return {...acc, [type]: {...acc[type], [key]: val}};
  }, {});

export default (diff) => JSON.stringify(proc(diff), null, 2);

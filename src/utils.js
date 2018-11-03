export const uniq = (arr) => [...new Set(arr)];

export const flattenDeep = (arr) =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? [...acc, ...flattenDeep(val)] : [...acc, val],
    [],
  );

import string from './toString';
import plain from './toPlain';
import json from './toJson';

const formatter = {
  string,
  plain,
  json,
};

export default (format, diff) => {
  try {
    return formatter[format](diff);
  } catch (error) {
    throw new Error(`no support for ${format} format`);
  }
};

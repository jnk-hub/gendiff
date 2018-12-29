import toString from './toString';
import toPlain from './toPlain';
import toJson from './toJson';

const getFormatter = (format) => {
  switch (format) {
    case 'string':
      return toString;
    case 'plain':
      return toPlain;
    case 'json':
      return toJson;
    default:
      throw new Error(`format ${format} no support`);
  }
};

export default (format, diff) => {
  const formatter = getFormatter(format);
  try {
    return formatter(diff);
  } catch (error) {
    throw new Error('failed to format data', error);
  }
};

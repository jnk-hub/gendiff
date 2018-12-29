import ini from 'ini';
import yml from 'js-yaml';

const getParser = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'ini':
      return ini.parse;
    case 'yaml':
    case 'yml':
      return yml.safeLoad;
    default:
      throw new Error(`format ${format} no support`);
  }
};

export default (format, data) => {
  const parser = getParser(format);
  try {
    return parser(data);
  } catch (error) {
    throw new Error(`failed to parse data`, error);
  }
};

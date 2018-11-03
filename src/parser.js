import ini from 'ini';
import yml from 'js-yaml';

const parser = {
  json: JSON.parse,
  ini: ini.parse,
  yaml: yml.safeLoad,
  yml: yml.safeLoad,
};

export default (format, data) => {
  try {
    return parser[format](data);
  } catch (error) {
    throw new Error(`no support for ${format} format`, error);
  }
};

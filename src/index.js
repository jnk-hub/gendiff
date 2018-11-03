import {promisify} from 'util';
import {readFile} from 'fs';
import {extname} from 'path';
import calcDiff from './diff';
import parse from './parser';

const read = promisify(readFile);

export default async (filePath1, filePath2) => {
  const paths = [filePath1, filePath2];
  const [ext1, ext2] = paths.map((path) => extname(path).replace(/\./, ''));
  return Promise.all(paths.map((filepath) => read(filepath, 'utf8')))
    .catch((error) => {
      throw error;
    })
    .then(([file1, file2]) => calcDiff(parse(ext1, file1), parse(ext2, file2)));
};

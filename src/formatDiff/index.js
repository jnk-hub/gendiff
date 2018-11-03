import genDiff from '..';
import format from './formatter';

export default async (filePath1, filePath2, outputFormat = 'string') => {
  try {
    const result = await genDiff(filePath1, filePath2).then((diff) =>
      format(outputFormat, diff),
    );
    return result;
  } catch (error) {
    throw error;
  }
};

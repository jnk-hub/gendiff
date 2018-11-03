import formatDiff from '../formatDiff';

export default async (filePath1, filePath2, {format = 'string'}) => {
  try {
    const result = await formatDiff(filePath1, filePath2, format);
    console.log(result);
  } catch ({message}) {
    console.error(message);
  }
};

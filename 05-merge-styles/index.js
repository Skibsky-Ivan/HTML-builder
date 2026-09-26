const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');

async function mergeStyles() {
  const distFolderPath = path.join(__dirname, 'project-dist');
  const stylesFolderPath = path.join(__dirname, 'styles');

  await fsPromises.rm(distFolderPath, { recursive: true, force: true });
  await fsPromises.mkdir(distFolderPath, { recursive: true });

  const styleEntries = await fsPromises.readdir(stylesFolderPath, {
    recursive: true,
  });

  const styleFiles = styleEntries.filter(
    (file) => path.extname(file) === '.css',
  );

  const writeble = fs.createWriteStream(
    path.join(distFolderPath, 'bundle.css'),
  );

  try {
    for (const file of styleFiles) {
      const readeble = fs.createReadStream(path.join(stylesFolderPath, file));
      for await (const chunk of readeble) {
        writeble.write(chunk);
      }
    }
  } catch (err) {
    console.log('произошла ошибка передачи данных: ', err.message);
  } finally {
    writeble.end();
  }
}

mergeStyles();

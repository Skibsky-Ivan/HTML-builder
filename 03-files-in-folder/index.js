const fs = require('node:fs/promises');
const path = require('node:path');
const { stdout } = require('node:process');

async function filesInFolder(folderPath) {
  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile());

    for (const file of files) {
      const filePath = path.join(folderPath, file.name);

      const fileParsed = path.parse(filePath);
      const fileName = fileParsed.name;
      const fileExt = fileParsed.ext.slice(1);

      const statFile = await fs.stat(filePath);
      const fileSize = statFile.size;

      stdout.write(`${fileName} ${fileExt} ${fileSize}\n`);
    }
  } catch (err) {
    stdout.write(`ошибка чтения: ${err.message}`);
  }
}

filesInFolder(path.join(__dirname, 'secret-folder'));

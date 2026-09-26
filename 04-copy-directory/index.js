const fs = require('node:fs/promises');
const path = require('node:path');

async function copyDir(srcFolder, distFolder) {
  await fs.rm(distFolder, { recursive: true, force: true });
  await fs.mkdir(distFolder, { recursive: true });

  const entries = await fs.readdir(srcFolder, { recursive: true });

  for (const entry of entries) {
    const pathSrcFile = path.join(srcFolder, entry);

    const statFile = await fs.stat(pathSrcFile);
    if (statFile.isFile()) {
      const pathDistFile = path.join(distFolder, entry);
      const pathDir = path.dirname(pathDistFile);
      await fs.mkdir(pathDir, { recursive: true });
      await fs.copyFile(pathSrcFile, pathDistFile);
    }
  }
}

copyDir(path.join(__dirname, 'srcDir'), path.join(__dirname, 'distDir'));

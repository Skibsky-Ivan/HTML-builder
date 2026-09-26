const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');

function filterFiles(files, ext) {
  return files.filter((file) => path.extname(file) === ext);
}

async function mergeStyles(srcDirPath, distDirPath) {
  const srcDirStylesPath = path.join(srcDirPath, 'styles');
  const distStylesPath = path.join(distDirPath, 'style.css');

  const styleEntries = await fsPromises.readdir(srcDirStylesPath, {
    recursive: true,
  });

  const styleFiles = filterFiles(styleEntries, '.css');

  const writable = fs.createWriteStream(distStylesPath);

  try {
    for (const file of styleFiles) {
      const readeble = fs.createReadStream(path.join(srcDirStylesPath, file));
      for await (const chank of readeble) {
        writable.write(chank);
      }
      writable.write('\n');
    }
  } catch (err) {
    console.log('ошибка переноса стилей', err.message);
  } finally {
    writable.end();
  }
}

async function copyDir(srcDirPath, distDirPath) {
  const srcDirAssetsPath = path.join(srcDirPath, 'assets');
  const distDirAssetsPath = path.join(distDirPath, 'assets');

  const assetsEntries = await fsPromises.readdir(srcDirAssetsPath, {
    recursive: true,
  });

  for (const entrie of assetsEntries) {
    const entriePath = path.join(srcDirAssetsPath, entrie);

    const entrieStat = await fsPromises.stat(entriePath);

    if (entrieStat.isFile()) {
      const distAssetsFilePath = path.join(distDirAssetsPath, entrie);
      const entriesDirPath = path.dirname(distAssetsFilePath);
      await fsPromises.mkdir(entriesDirPath, {
        recursive: true,
      });
      await fsPromises.copyFile(entriePath, distAssetsFilePath);
    }
  }
}

async function mergeHtml(srcDirPath, distDirPath) {
  const srcDirComponentsPath = path.join(srcDirPath, 'components');
  const srcTemplatePath = path.join(srcDirPath, 'template.html');
  const distTemplatePath = path.join(distDirPath, 'index.html');

  const componentsEntries = await fsPromises.readdir(srcDirComponentsPath, {
    recursive: true,
  });
  const componentsHtmlFiles = filterFiles(componentsEntries, '.html');

  let templateHtml = await fsPromises.readFile(srcTemplatePath, 'utf8');

  for (const component of componentsHtmlFiles) {
    const componentHtml = await fsPromises.readFile(
      path.join(srcDirComponentsPath, component),
      'utf8',
    );
    const componentName = path.basename(component, '.html');
    templateHtml = templateHtml.replaceAll(
      `{{${componentName}}}`,
      componentHtml,
    );
  }

  await fsPromises.writeFile(distTemplatePath, templateHtml, 'utf8');
}

async function buildPage(srcDirPath, distDirPath) {
  await fsPromises.rm(distDirPath, { recursive: true, force: true });
  await fsPromises.mkdir(distDirPath, { recursive: true });

  await Promise.all([
    mergeStyles(srcDirPath, distDirPath),
    mergeHtml(srcDirPath, distDirPath),
    copyDir(srcDirPath, distDirPath),
  ]);
}

buildPage(__dirname, path.join(__dirname, 'project-dist'));

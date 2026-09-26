const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { stdin, stdout } = require('node:process');

const fileOutput = path.join(__dirname, 'text.txt');
const writeble = fs.createWriteStream(fileOutput, { flags: 'a' });

writeble.on('error', (err) => {
  console.error('ошибка записи файла', err.message);
});

stdout.write('напиши что небудь...\n');

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  if (line.trim() === 'exit') {
    rl.close();
    return;
  }
  writeble.write(`${line}\n`);
});

rl.on('close', () => {
  stdout.write('до новых втречь\n');
  writeble.end();
  process.exit(0);
});

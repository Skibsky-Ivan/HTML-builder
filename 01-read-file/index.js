const path = require('node:path');
const fs = require('node:fs');

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'));

stream.pipe(process.stdout);
stream.on('error', (error) => console.error(error.messagec));

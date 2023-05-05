
const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream('text.txt');

const { stdin, stdout } = process;



fs.writeFile(
   path.join(__dirname, 'text.txt'),
   '',
   (err) => {
      if (err) throw err;
      console.log('Файл был создан');
   }
);

stdout.write('Введите текст\n');
stdin.on('data', data => {
   stdout.write('Привет, ');
   output.appendFile(data);
   process.exit();
});
process.on('exit', () => stdout.write('Удачи!'));

// const input = fs.createReadStream('source.txt', 'utf-8');
// const output = fs.createWriteStream('text.txt');

// input.on('data', chunk => output.write(chunk));
// input.on('error', error => console.log('Error', error.message));
// fs.appendFile()

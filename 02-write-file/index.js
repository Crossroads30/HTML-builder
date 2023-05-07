const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Введите текст\n');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdin.on('data', data => {
   if (data.toString() == 'exit\n') {
      process.exit()
   }
   writeStream.write(data)
});
process.on('exit', () => stdout.write('\nУдачи!\n'));
process.on('SIGINT', () => process.exit());


let path = require('path'); 
// console.log(path.parse(__filename));

let fs = require('fs');
fs.readdir('03-files-in-folder/secret-folder', (err, files) => {
   if (err) throw err; // не прочитать содержимое папки
   for (i = 0; i < files.length; i++) {
      let fileName = files[i]
         // let pathName = path.join(__dirname, fileName)
         // console.log(path.extname(fileName).substring(1));
         // console.log(path.basename(fileName, path.extname(fileName)))
      fs.stat('./03-files-in-folder/secret-folder/' + fileName, function (err, stats) {
         // console.log(stats);
         // console.log(pathName);
         console.log(path.basename(fileName, path.extname(fileName)) + ' ' + '-' + ' ' + path.extname(fileName).substring(1) + ' ' + '-' + ' ' + stats.size + 'b');
      });
   }
   // console.log('В папке находятся файлы:' + JSON.stringify(files));
});
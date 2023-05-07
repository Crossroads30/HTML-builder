const fs = require('fs');
let path = require('path');
const writeStream = fs.createWriteStream(path.join('05-merge-styles/project-dist', 'bundle.css'));

fs.readdir('05-merge-styles/styles', (err, files) => {
   if (err) throw err; 
   for (i = 0; i < files.length; i++) {
      const fileName = files[i]
      const extName = path.extname(fileName).substring(1);
      if (err) {
         console.error(err);
         return;
      }
      if (extName == 'css') {
         fs.readFile('./05-merge-styles/styles/' + fileName, 'utf8', (err, data) => {
            if (err) {
               console.error(err);
               return;
            }
            writeStream.write(data);
         })
      }
   }
});

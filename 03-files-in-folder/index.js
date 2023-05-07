let path = require('path'); 
let fs = require('fs');

fs.readdir('03-files-in-folder/secret-folder', (err, files) => {
   if (err) throw err; 
   for (i = 0; i < files.length; i++) {
      let fileName = files[i]
   
      fs.stat('./03-files-in-folder/secret-folder/' + fileName, function (err, stats) {
         if (err) throw err; 
         if (stats.isFile()){
            console.log(path.basename(fileName, path.extname(fileName)) + ' ' + '-' + ' ' + path.extname(fileName).substring(1) + ' ' + '-' + ' ' + stats.size + 'b');
         }
      });
   }
});
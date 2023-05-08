const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {//make 'files-copy' dir.
   if (err) {
      console.error(err);
      return;
   }
});

//read 'files' dir. to find files 
fs.readdir('04-copy-directory/files', (err, files) => {
   if (err) {
      console.error(err);
      return;
   }
   for (i = 0; i < files.length; i++) {
      let allFiles = files[i];
      //copying staff from origin to 'copy folder'
      fs.copyFile('04-copy-directory/files/'+ allFiles, '04-copy-directory/files-copy/' + allFiles, (err) => {
         if (err) {
            console.error(err);
            return;
         }
      })
   }
});

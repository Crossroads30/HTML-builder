const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'),{
   recursive:true,
}, (err) => {
   if (err) {
      // console.error(err);
   }
   fs.mkdir(path.join(__dirname, 'files-copy'),{//make 'files-copy' dir.
      recursive:true,
   }, (err) => {
      if (err) {
         console.error(err);
         return;
      }
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
   });
   });

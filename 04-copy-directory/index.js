const fs = require('fs');

fs.cp('04-copy-directory/files', '04-copy-directory/files-copy', { recursive: true }, (err) => {
   if (err) {
      console.error(err);
   }
});
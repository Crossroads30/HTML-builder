const fs = require('fs');
const path = require('path');

//----script for creating 'project-dist' folder----

fs.mkdir(path.join(__dirname, 'project-dist'),{
   recursive:true,
}, (err) => {
   if (err) {
      // console.error(err);
      return;
   }
});

//----script for raplacing tamplate tags with html elements----

fs.readFile('06-build-page/template.html', 'utf8', (err, data) => {//read template data
   let findData = data;

   if (err) {
      console.error(err);
      return;
   }

   fs.readdir('06-build-page/components/', (err, files) => {//read 'component' folder to find 'html'files 
      if (err) {
         console.error(err);
         return;
      }

      for (i = 0; i < files.length; i++) {
         const fileName = path.parse(files[i]).name
         // console.log(fileName);
         fs.readFile('06-build-page/components/' + files[i], 'utf8', (err, data) => {//read 'html'files in 'components' to get it`s data
            if (err) {
               console.error(err);
               return;
            }
            findData = findData.replace(`{{${fileName}}}`, data);//raplace template tags with 'html-elements' from 'components' folder
            // console.log(findData);
            fs.createWriteStream(path.join('06-build-page/project-dist', 'index.html')).write(findData);
         })
      }
   })
});

//----script for bundling all 'css files' into one 'style.css' in 'project-dist' folder----

const writeStream = fs.createWriteStream(path.join('06-build-page/project-dist', 'style.css'));//create a css file

fs.readdir('06-build-page/styles', (err, files) => {//read folder to find 'css' files
   if (err) {
      console.error(err);
      return;
   }
   for (i = 0; i < files.length; i++) {
      const fileName = files[i]
      const extName = path.extname(fileName).substring(1);
      if (err) {
         console.error(err);
         return;
      }
      if (extName == 'css') {
         fs.readFile('./06-build-page/styles/' + fileName, 'utf8', (err, data) => {// read files to get it`s data
            if (err) {
               console.error(err);
               return;
            }
            // console.log(data);
            writeStream.write(data);//writing css files data into style.css in 'project-dist' folder 
         })
      }
   }
});

//----script for copying 'assets' folder into 'project-dist' folder 

//make a assets dir in project-dist folder
fs.mkdir(path.join('06-build-page/project-dist', 'assets'),{//make 'files-copy' dir.
   recursive:true,
}, (err) => {
   if (err) {
      console.error(err);
      return;
   }
});

//read origin 'assets' dir. to find it`s staff
fs.readdir('06-build-page/assets', (err, items) => {
   if (err) {
      console.error(err);
      return;
   }
   for (i = 0; i < items.length; i++) {
      let staff = items[i];

      //script for copying staff from origin 'assets' to 'copy-assets' folder
      fs.stat('./06-build-page/assets/' + staff, function (err, stats) {
         if (err) throw err;
         if (stats.isFile()) {//check if item is a file or a folder 
            fs.copyFile('06-build-page/assets/' + staff, '06-build-page/project-dist/assets/' + staff, (err) => {
               if (err) {
                  console.error(err);
                  return;
               }
            })
         }
         else {
            fs.mkdir(path.join('06-build-page/project-dist/assets', staff),{
               recursive:true,
            }, (err) => {//make copy from inner dirs.
               if (err) {
                  console.error(err);
                  return;
               }
            })
         }
      });
      //read 'assets' inner folders to copy it`s staff 
      fs.readdir('06-build-page/assets/' + staff, (err, files) => {
         if (err) {
            console.error(err);
            return;
         }
         // console.log(files);
         for (let i = 0; i < files.length; i++) {
            let innerStaff = files[i];
            //copying files from 'assets' inner folders
            fs.copyFile('06-build-page/assets/' + staff + '/' + innerStaff, '06-build-page/project-dist/assets/' + staff + '/' + innerStaff, (err) => {
               if (err) {
                  console.error(err);
                  return;
               }
            })
         }
      })
   }
});

//------------------------------------------------------------------------------------------------


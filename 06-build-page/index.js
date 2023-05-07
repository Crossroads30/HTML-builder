const fs = require('fs');
const path = require('path');

//----script for creating 'project-dist' folder----

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => { 
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

fs.cp('06-build-page/assets', '06-build-page/project-dist/assets', { recursive: true }, (err) => {
   if (err) {
      console.error(err);
      return;
   }
});

//------------------------------------------------------------------------------------------------
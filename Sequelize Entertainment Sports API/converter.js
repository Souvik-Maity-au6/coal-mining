const DataUri = require("datauri");
const path = require("path");
const newDataUri = new DataUri();




module.exports= function(originalName, buffer){

    let extension = path.extname(originalName);
    return newDataUri.format(extension,buffer).content;
}
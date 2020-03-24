var DataUri = require("datauri");
var path = require("path");
var newDataUri = new DataUri();

module.exports= function(originalName, buffer){

    var extension = path.extname(originalName);
    console.log("extension:",extension);
    return newDataUri.format(extension,buffer).content;
}
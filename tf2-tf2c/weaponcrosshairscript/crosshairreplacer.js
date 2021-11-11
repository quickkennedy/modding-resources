// gotta have filesystem for this, otherwise node.js cant do the funny
var fs = require("fs")

// crosshair variables (:
var crosshairFile = "sprites/crosshairs/test"
var crosshairWidth = 64
var crosshairHeight = 64

//all the stupid code

var files = fs.readdirSync("./input/", function(err, result) {
     if(err) console.log('error', err);
});

for (i = 0; i < files.length; i++) {
    // read weapon script #i
    var fileData = fs.readFileSync("./input/" + files[i], "utf8", function(err, result) {
        if(err) console.log('error', err);
    })
    fileDataReplace = fileData.replace("sprites/crosshairs", crosshairFile)
    fileDatasplit = fileDataReplace.split(crosshairFile,2)
    fileDatasplit[0] += crosshairFile + "\""
    fileDatasplit2 = fileDatasplit[1].split("}")
    fileDataBrackets = ""
    for (i2 = 0; i2 < fileDatasplit2.length; i2++) {
        fileDatasplit2[i2] += "}"
        if (i2 >= 2 && i2 != fileDatasplit2.length - 1) {
            fileDataBrackets += fileDatasplit2[i2]
        }
    }

    customCrosshairData = "\n\"x\" \"0\" \n\"y\" \"0\" \n\"width\" \"" + crosshairWidth + "\"\n\"height\" \"" + crosshairHeight + "\"\n}\/\/ added by jack\'s crosshair script (:"
    fileDatasplit2[0] = customCrosshairData

    //console.log(fileDatasplit[0] + fileDatasplit2[0] + fileDatasplit2[1] + fileDataBrackets)
    //console.log(fileDatasplit[0].toString() + fileDatasplit2[0].toString() + fileDatasplit2[1].toString() + fileDataBrackets)

    fileDatafinal = fileDatasplit[0].toString() + fileDatasplit2[0].toString() + fileDatasplit2[1].toString() + fileDataBrackets

    fs.writeFileSync("./output/" + files[i], fileDatafinal, function(err, result) {
        if(err) console.log('error', err);
    })
}

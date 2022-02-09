var fs = require("fs")
// this allows us to use filesystem, without it node.js cannot edit files.

var crosshairFile = "test"
// this is the .vmt that we need to have beforehand.

var crosshairWidth = 64
var crosshairHeight = 64
// node.js isnt going to magically detect the crosshair's resolution, so you need to set it yourself. if you dont know the crosshair's resolution, try 64

var files = fs.readdirSync("./input/", function(err, result) {
// create an array that contains the name of every file by scanning the ./input folder

    if(err) console.log('error', err)
    // give an error about getting the file names
})

for (i = 0; i < files.length; i++) {
// for every file we found in the input folder

    var fileData = fs.readFileSync("./input/" + files[i], "utf8", function(err, result) {
    // get the text present in input file #i

        if(err) console.log('error', err)
        // give an error about reading the files
    })

    fileDataReplace = fileData.replace("sprites/crosshairs", crosshairFile)
    // replace the first instance of "sprites/crosshairs" with the custom crosshair path

    fileDataSplit = fileDataReplace.split(crosshairFile,2)
    // split the file in two using the replaced text

    fileDataSplit[0] += crosshairFile + "\""
    // split removes the custom crosshair, so we add back the custom crosshair text and a single quotation mark to come after it

    fileDataSplit2 = fileDataSplit[1].split("}")
    // we take the 2nd item in fileDataSplit to get the text after the custom crosshair, the "autoaim" section followed by the closing curly brackets

    fileDataBrackets = ""
    // there are 3 brackets at the end that this script does not copy because of the split we just made removing the 3 right curly brackets at the end

    for (i2 = 0; i2 < fileDataSplit2.length; i2++) {
    //for every item in fileDataSplit2

        fileDataSplit2[i2] += "}"
        // add a right bracket to the item

        if (i2 >= 2 && i2 != fileDataSplit2.length - 1) {
        // if we arent on the first, second, third nor the last bracket

            fileDataBrackets += fileDataSplit2[i2]
            // add text from fileDataSplit2 to fileDataBrackets
        }
    }

    fileDataSplit2[0] = "\n\"x\" \"0\" \n\"y\" \"0\" \n\"width\" \"" + crosshairWidth + "\"\n\"height\" \"" + crosshairHeight + "\"\n}\/\/ added by jack\'s crosshair script (:"
    // replace the first item in fileDataSplit2 with the crosshair data we got earlier
    // this is a really big string that looks like this when actually put into the text file:

    // "x" "0"
    // "y" "0"
    // "width" "[crosshairWidth]"
    // "height" "[crosshairHeight]"
    // } // added by jack's crosshair script (:

    // every \n is for new line, every \" is for a quotation mark, every \/ is a forward slash, and the +'s put the strings together
    // we can set x to 0 and y to 0 since this is just 1 file, rather than 1 file containing multiple crosshairs like tf2's default crosshairs.

    fileDatafinal = fileDataSplit[0].toString() + fileDataSplit2[0].toString() + fileDataSplit2[1].toString() + fileDataBrackets + "\n"
    // generate the final string to be put into the new file

    fs.writeFileSync("./output/" + files[i], fileDatafinal, function(err, result) {
    // create a new file in ./output that contains fileDataFinal

        if(err) console.log('error', err)
        // give an error about writing the file
    })
}

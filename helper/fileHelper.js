const fileSystem = require('fs');
const path = require('path');

module.exports = class fileHelper{
    writeContentsToFile(content, fileName, filesPath){
        let dir =  this.sanitizePath(filesPath)
        if (!fileSystem.existsSync(dir)){
            this.createPath(dir);
        }

        const fileLocation = `${dir}${fileName}`
        fileSystem.writeFile(fileLocation, content, function(error){
            if (error){
                console.log(error)
            }
        });
        console.log(`File Created: ${fileLocation}`)
        return fileLocation
    }

    createPath(directoryPath){
        const sep = path.sep;
        const initDir = path.isAbsolute(directoryPath) ? sep : '';
        directoryPath.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(parentDir, childDir);
            try {
                fileSystem.mkdirSync(curDir);
            }catch (err){
            }   
            return curDir;
        }, initDir);
    }

    sanitizePath(dirPath){
        const sep = path.sep; 

        if(dirPath.length === 0){
            return `.${sep}`
        }
        let mutablePath = dirPath.replace(".", "");
        
        let pathComponents = mutablePath.split(sep);
        let fullCompoents = pathComponents.filter((component) => {
            if(component.length === 0){
                return false 
            }else{
                return true 
            }
        });
        let newPath = fullCompoents.join(sep)
        let fullPath = "." + sep + newPath + sep  
        return fullPath
    }
}
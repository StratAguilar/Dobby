#!/usr/bin/env node 

const program = require('commander')
const fileSystem = require('fs')
const FileHelper = require('./helper/fileHelper')
const Formatter = require('./helper/formatter')

program
    .arguments('<componentName>')
    .option('-t, --type <type>', 'Set the component type e.g. viewStack, view, style, viewstyle ... default is viewStack')
    .option('-f, --format <format>', 'Select Library format e.g. xp, rn, wx... default is xp')
    .action(function(componentName) {

        let fileHelper = new FileHelper()
        let formatter = new Formatter()
        let type = program.type ? program.type : 'viewStack'
        let format = program.format ? program.format : 'xp'

        if(componentName === undefined || componentName.length === 0){
            console.log("Error: Component name cannot be empty")
            return 
        }

        let validComponentName = formatter.formatComponentName(componentName)
        let parentDirectory = validComponentName

        if(type === "viewStack" || type === "view" || type === 'viewstyle'){

            if(validComponentName.length === 0 || validComponentName === ""){
                console.log("Error: Invalid component name")
                return 
            }

        } 
        
        if (type === "style" || type === "viewstyle" || type === 'view'){
            parentDirectory = ""
        }

        if(type === "viewStack" || type === "view"  || type === "viewstyle"){
            let mainContent = formatter.createComponentContent(validComponentName, format)
            let mainLocation = fileHelper.writeContentsToFile(mainContent, `${validComponentName}.tsx`, `${parentDirectory}`)
        }

        if(type === "viewStack" || type === "style" || type === "viewstyle"){
            let styleContent = formatter.createStyleContent(format)
            let styleLocation = fileHelper.writeContentsToFile(styleContent, "styles.ts", `${parentDirectory}`)
        }

        if(type === "viewStack"){
            let indexContent = formatter.createIndexContent(validComponentName, format)
            let indexLocation = fileHelper.writeContentsToFile(indexContent, "index.ts", `${parentDirectory}`)
        }

    })
    .parse(process.argv)
module.exports = class Formatter{
    createStyleContent(format){
        let content = ""
        switch(format){
        case 'rn':
            content += "import { StyleSheet } from 'react-native'\n\n"
            content += "const styles = StyleSheet.create({\n"
            content += "\tmainContainer: {\n"
            content += "\t}\n"
            content += "})\n\n"
            content += "export default styles"
            break 
        default:
            content += "const RX = require('reactxp')\n"
            content += "import { Styles } from 'reactxp'\n\n"
            content += "const styles = {\n"
            content += "\tmainContainer: Styles.createViewStyle({\n"
            content += "\t})\n"
            content += "}\n\n"
            content += "export default styles"
        }
        return content
    }

    createIndexContent(componentName, format){

        let content = ""
        switch(format){
        default: 
            content += `import ${componentName} from './${componentName}'\n`
            content += `export default ${componentName}`

        }
        return content
    }

    createComponentContent(componentName, format){
        let componentInterfaceName = `${componentName}Props`
        let componentStateName = `${componentName}State`
        let content = ""
        switch(format){
        case 'rn':
            content += "import * as React from 'react'\n"
            content += "import {\n"
            content += "\tView\n"
            content += "} from 'react-native'\n"
            content += "import styles from './styles'\n\n"
            content += `interface ${componentInterfaceName} {\n`
            content += "}\n\n"
            content += `const ${componentName}: React.SFC<${componentInterfaceName}> = (props) => {\n\n`
            content += "\treturn(\n"
            content += "\t\t<View></View>\n"
            content += "\t)\n"
            content += "}\n"
            content += `export default ${componentName}`
            break 
        case "wx":
            content += "import RX = require('reactxp')\n"
            content += "import {\n"
            content += "\tView,\n"
            content += "\tComponent\n"
            content += "} from 'reactxp'\n"
            content += "import styles from './styles'\n\n"
            content += `interface ${componentInterfaceName} {\n`
            content += "}\n\n"
            content += `interface ${componentStateName} {\n`
            content +=  "}\n\n"
            content += `class ${componentName} extends Component<${componentInterfaceName}, ${componentStateName}> {\n\n`
            content += `\tconstructor(props: ${componentInterfaceName}){\n`
            content += "\t\tsuper(props)\n\n"
            content += "\t}\n\n"
            content += "\tcomponentDidMount() {\n"
            content += "\t}\n\n"
            content += "\tcomponentWillUnmount() {\n"
            content += "\t}\n\n"
            content += "\trender(): JSX.Element | null {\n"
            content += "\t\treturn(\n"
            content += "\t\t\t<View style={styles.mainContainer}>\n"
            content += "\t\t\t</View>\n"
            content += "\t\t)\n"
            content += "\t}\n"
            content += "}\n"
            content += "const defaultProps ={\n"
            content += "}\n\n"
            content += `export default ${componentName}`
            break 
        default:
            content += "import RX = require('reactxp')\n"
            content += "import {\n"
            content += "\tView,\n"
            content += "\tComponent\n"
            content += "} from 'reactxp'\n"
            content += "import styles from './styles'\n\n"
            content += `interface ${componentInterfaceName} {\n`
            content += "}\n\n"
            content += `interface ${componentStateName} {\n`
            content +=  "}\n\n"
            content += `class ${componentName} extends Component<${componentInterfaceName}, ${componentStateName}> {\n\n`
            content += `\tconstructor(props: ${componentInterfaceName}){\n`
            content += "\t\tsuper(props)\n\n"
            content += "\t}\n"
            content += "\trender(){\n"
            content += "\t\treturn(\n"
            content += "\t\t\t<View style={styles.mainContainer}>\n"
            content += "\t\t\t</View>\n"
            content += "\t\t)\n"
            content += "\t}\n"
            content += "}\n"
            content += "const defaultProps ={\n"
            content += "}\n\n"
            content += `export default ${componentName}`
        }
        return content 
    }

    sanitizeToAlphaNumeric(value){
        let sanitizedValue = value.replace(/\W/g, '')
        return sanitizedValue
    }

    formatComponentName(value){
        if (value.length === 0){
            return "" 
        } 

        let sanitizedValue = this.sanitizeToAlphaNumeric(value)
        let capitalizedValue = sanitizedValue.charAt(0).toUpperCase() + sanitizedValue.slice(1)

        return capitalizedValue
    }
}
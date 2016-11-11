/**
 * 异步执行eslint，不会阻塞webpack编译
 */
import {CLIEngine} from 'eslint'

export default class EslintPlugin {
    constructor(options){
        this.engins = new CLIEngine(options);
        this.options = Object.assign(
            {
                format: 'stylish'
            },
            options
        );
    }
    apply(compiler){
        compiler.plugin('done', (stats, cb) => {
            const files = stats.compilation.fileDependencies.filter(item => !~item.indexOf('node_modules') && ~['.js', '.jsx'].indexOf(path.parse(item).ext));            
            const results = CLIEngine.getErrorResults(this.engins.executeOnFiles(files).results);
            this.printResults(results)
        })
    }
    printResults(results){
        let formatter;
        try{
            formatter = this.engins.getFormatter(this.options.format)
        } catch(e) {
            console.log(e.message);
            return false;
        }
        console.log(formatter(results))
        return false;
    }
}

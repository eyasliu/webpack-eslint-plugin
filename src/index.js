/**
 * 异步执行eslint，不会阻塞webpack编译
 */
import {CLIEngine} from 'eslint'
import path from 'path'
import minimatch from 'minimatch'

export default class EslintPlugin {
    constructor(options = {}){
        if(options.include && typeof options.include === 'string'){
            options.include = [options.include]
        }
        this.options = Object.assign(
            {
                format: 'stylish',
                include: [
                    '**/*.js',
                    '**/*.jsx'
                ]
            },
            options
        );
        this.engins = new CLIEngine(this.options);
    }
    apply(compiler){
        compiler.plugin('done', stats => {
            let files = Array.prototype.concat.apply([], this.options.include.map(item => {
                return stats.compilation.fileDependencies.filter(minimatch.filter(item), {matchBase: true})
            }))
            files = (files => {
                let tmp = []
                files.forEach(i => !~tmp.indexOf(i) && tmp.push(i))
                return tmp
            })(files)         
            const results = CLIEngine.getErrorResults(this.engins.executeOnFiles(files).results);
            this.options.beforeOutput && this.options.beforeOutput(results);
            this.printResults(results)
        })
    }
    printResults(results){
        let formatter;
        try{
            formatter = typeof this.options.format !== 'function' ? (this.engins.getFormatter(this.options.format)) : this.options.format
        } catch(e) {
            console.log(e.message);
            return false;
        }
        console.log(formatter(results))
        return false;
    }
}

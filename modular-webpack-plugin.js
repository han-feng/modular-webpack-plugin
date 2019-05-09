const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const path = require('path')
// const pluginName = 'ModularWebpackPlugin'

module.exports = class ModularWebpackPlugin {
  apply (compiler) {
    // console.log('\n>> base dir : ', compiler.options.context)
    // console.log('\n>> output dir : ', compiler.options.output.path)
    const src = path.join(compiler.options.context, 'modular.config')
    fs.readFile(src, 'utf8', function (err, data) {
      if (err) {
        return console.error(err)
      }
      const modules = data.split('\n').map(item => item.trim()).filter(item => item !== '')
      // console.log('\n>> modularConfig : ', modules)
      const copys = []
      modules.forEach(module => {
        let s = module
        if (s.startsWith('@/')) {
          s = s.replace('@/', 'src/')
        } else if (!s.startsWith('.')) {
          s = path.join('node_modules', s)
        }
        s = path.resolve(compiler.options.context, s, 'public')
        if (fs.existsSync(s)) {
          copys.push({
            from: s,
            to: compiler.options.output.path,
            toType: 'dir',
            ignore: [
              '.DS_Store'
            ]
          })
        }
      })
      // console.log('\n>> ', copys)
      if (copys.length > 0) {
        new CopyWebpackPlugin(copys).apply(compiler)
      }
    })
  }
}

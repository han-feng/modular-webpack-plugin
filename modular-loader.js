module.exports = function (source) {
  // console.log('>>>> ModularLoader \n', source)
  const modules = source.split('\n').map(item => item.trim()).filter(item => item !== '')
  // console.log(modules)
  let importCode = ''
  let code = 'export default ['
  let i = 0
  modules.forEach(module => {
    importCode += `import m${i} from '${module}';`
    if (i > 0) {
      code += ', '
    }
    code += `m${i}`
    i++
  })
  code += '];'
  code = importCode + code
  // console.log(code)
  return code
}

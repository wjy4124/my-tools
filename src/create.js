var copy = require('copy')
var path = require('path')
var fs = require('fs')
var {red, green} = require('chalk')
var template = path.resolve(__dirname, '../templates')

module.exports = {
  copy(projectName) {
    let target = path.resolve(process.cwd(), projectName)
    if (fs.existsSync(target)) {
      console.error(red('project exists!!'))
      return
    }
    copy(`${template}/**/*`, target, (err, files) => {
      if (err) console.error(err)
      files.forEach(e => console.info(`${green('create:')}`, e.dest))
    })
  }
}

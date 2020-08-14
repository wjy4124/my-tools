let path = require('path')
let cwd = process.cwd()

process.argv.push('--gulpfile')
process.argv.push(path.join(__dirname, '../gulpfile.js'))

process.argv.push('--cwd')
process.argv.push(cwd)

require('gulp/bin/gulp')

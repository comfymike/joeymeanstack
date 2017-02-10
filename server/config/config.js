var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/joeymeanstack',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://mlafirenza:joeymeanstack@ds145659.mlab.com:45659/joeymeanstack',
    rootPath: rootPath,
    port: process.env.PORT || 80

  }
}
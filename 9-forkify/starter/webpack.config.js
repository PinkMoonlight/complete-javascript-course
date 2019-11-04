const path = require('path'); // build in node module called path
module.exports = {
  entry: './src/js/index.js',
  output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: 'bundle.js'
  },
  mode: 'development'  
};
const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets'),
  },
  mode: 'development', 
  devtool: 'source-map',
};
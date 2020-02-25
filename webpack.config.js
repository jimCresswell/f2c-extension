const path = require('path');

module.exports = {
  entry: './src/content_script.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

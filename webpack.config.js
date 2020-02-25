const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Note: this extension isn't intended for publication,
// so there is no 'production' build.
module.exports = {
  mode: 'development',
  entry: {
    content_script: './src/content_script.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin([
      { from: 'src/manifest.json', to: 'manifest.json' },
      { from: 'src/icons', to: 'icons' },
      { from: 'src/browserAction', to: 'browserAction' },
    ]),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Note: this extension is intended as a demo,
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {},
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

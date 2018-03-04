const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/js/background.ts',
  output: {
    path: path.resolve(__dirname, 'webtime-dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/ext_files' }
    ], { copyUnmodified: true })
  ]
};

module.exports = config;

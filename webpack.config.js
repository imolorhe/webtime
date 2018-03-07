const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    bundle: './src/app/background.ts',
    app: './src/app/app.ts',
    popup: './src/app/popup.ts'
  },
  output: {
    path: path.resolve(__dirname, 'webtime-dist')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'],
    alias: { vue: 'vue/dist/vue.esm.js' }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/ext_files' }
    ], { copyUnmodified: true })
  ]
};

module.exports = config;

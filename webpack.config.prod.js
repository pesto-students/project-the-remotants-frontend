const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/config/ant-theme-vars.less'), 'utf8'));


const config = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  resolve: {
    extensions: ['.js', '.less', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};

module.exports = config;


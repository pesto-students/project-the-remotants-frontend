const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    'babel-polyfill',
    './index.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;

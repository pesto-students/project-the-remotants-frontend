const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: [
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
    path: __dirname + "/dist",
    filename: 'bundle.js'
  },
};

module.exports = config;
const path = require('path');

const config = {
<<<<<<< HEAD
=======
  context: path.resolve(__dirname, 'src'),
>>>>>>> 352286b... :tada: FEAT
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
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 352286b... :tada: FEAT
};

module.exports = config;
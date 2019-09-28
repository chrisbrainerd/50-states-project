const resolve = require('path').resolve;
const webpack = require('webpack');

const config = {
  mode: 'development',

  entry: {
    app: resolve('./src/index.js')
  },

  output: {
    library: 'App'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.(js|jsx)$/,
        include: [__dirname],
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
              plugins: ['@babel/proposal-class-properties']
            }
          }
        ]
      }
    ]
  }
};

// Enables bundling against src in this repo rather than the installed version
module.exports = (env) =>
  env && env.local ? require('../webpack.config.local')(config)(env) : config;

const resolve = require('path').resolve;
const webpack = require('webpack');
const os = require('os');

function getLocalIp() {
  for (let addresses of Object.values(os.networkInterfaces())) {
    for (let add of addresses) {
      if (add.address.startsWith('192.168.')) {
        return add.address;
      }
    }
  }
}

const config = {
  mode: 'development',

  entry: {
    app: resolve('./src/index.js')
  },

  output: {
    library: 'App'
  },

  devServer: {
    host: getLocalIp(),
    port: 8080
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

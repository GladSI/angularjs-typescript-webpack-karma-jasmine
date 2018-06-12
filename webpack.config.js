const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './src');
const destPath = path.join(__dirname, './dist');

module.exports = {
  mode: 'development',

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'inline-source-map',
  context: sourcePath,
  entry: {
    main: `${sourcePath}/bootstrap.ts`,
    vendor: [
      'angular/angular.js',
      'angular-ui-router/release/angular-ui-router.js',
    ],
  },
  output: {
    path: destPath,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    modules: ['node_modules', 'src'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'ng-annotate-loader',
          {
            loader: 'awesome-typescript-loader',
            options: {
              ignoreDiagnostics: [
              ],
            },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: './src',
    port: 3000,
    inline: true,
    lazy: false,
    hot: false,
    historyApiFallback: true,
    stats: 'errors-only',
  },
};

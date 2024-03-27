const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "none",
  entry: `./js/app.js`,
  devtool: "inline-source-map",
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devServer: {
    open: true,
    hot: true,
    static: [
      {
        directory: path.join(__dirname),
        publicPath: "/",
        serveIndex: true,
      },
    ],
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    port: 3001,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/images/",
          outputPath: "/images/",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};

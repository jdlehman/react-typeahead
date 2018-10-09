const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputDir = path.join(__dirname, "dist/");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./client/index.js",
  mode: isProd ? "production" : "development",
  devtool: isProd ? false : "inline-source-map",
  output: {
    path: outputDir,
    publicPath: "dist",
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html"
    }),
    new webpack.DefinePlugin({
      __SERVER_URL__: JSON.stringify(process.env.SERVER_URL)
    })
  ],
  devServer: {
    compress: true,
    contentBase: "dist",
    port: process.env.PORT || 8000
  }
};

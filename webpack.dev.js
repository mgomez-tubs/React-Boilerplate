const { merge, mergeWithRules } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");

module.exports = mergeWithRules({
  // See https://github.com/survivejs/webpack-merge#mergewithrules
  // This first object establishes the merge rules. Valid annotations can be found under the link above.
  // Be aware that merging arrays (such as include) will append the new value to the already existing array.
  // Remember, webpack-merge does merge by default, not rewrite!
  // Matching the field "test" allows merging of equal rule entries in module.rules
  // Otherwise, the overwrite rules for /\.(js|jsx)$/ here would be added as a separate entry instead of merged into one
  module: {
    rules: {
      //
      test: "match",
    },
  },
})(common, {
  mode: "development",
  devtool: "eval",
  output: {
    // No need to specify path, since we are using devServer
    // Leaving the names equal for consistency
    // The served files can be found at http://localhost:8080/webpack-dev-server (set your port if necessary)
    filename: "[name].bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    hot: true,
    client: {
      logging: "warn",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        options: {
          plugins: [require.resolve("react-refresh/babel")],
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: true,
    usedExports: true,
    removeEmptyChunks: false,
  },
});

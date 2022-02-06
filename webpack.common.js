const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Use this to tenable the bundle analyzerpm
const options = {
  generateBundleAnalyzer: false,
};

module.exports = {
  entry: "./src/index.jsx",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        include: [path.resolve(__dirname, "src/")],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
        include: [path.resolve(__dirname, "src/")],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
        include: [path.resolve(__dirname, "src/")],
      },
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
        include: [path.resolve(__dirname, "src/")],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [
    options.generateBundleAnalyzer && new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "React App",
      template: "src/index.html",
      inject: "body",
    }),
  ].filter(Boolean),
};

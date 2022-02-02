const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

module.exports = (env) => {
  const isDevelopment = env.development || false;
  const options = {
    generateBundleAnalyzer: false,
  };
  return {
    mode: isDevelopment ? "development" : "production",
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
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
          include: [path.resolve(__dirname, "src/")],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, "src/")],
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      ],
    },
    devServer: {
      hot: true,
      client: {
        logging: "warn",
      },
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      options.generateBundleAnalyzer && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    devtool: "eval-source-map",
    optimization: {
      runtimeChunk: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
};

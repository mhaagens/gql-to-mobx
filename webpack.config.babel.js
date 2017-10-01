import webpack from "webpack";
import { join } from "path";

const devDir = join(__dirname, "src");
const distDir = join(__dirname, "dist");

export default {
  devtool: "cheap-eval-source-map",
  entry: devDir + "/demo.js",
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [["env", { modules: false, targets: { node: "current" } }]]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      "gql-to-mobx": devDir + "/index.js"
    }
  },
  plugins: [
      new webpack.NamedModulesPlugin,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: "index.js",
    path: distDir
  }
};

const path = require("path"),
  webpack = require("webpack"),
  plugins = {
    clean: (() => {
      const { CleanWebpackPlugin } = require("clean-webpack-plugin");
      return CleanWebpackPlugin;
    })(),
    html: require("html-webpack-plugin"),
    extractCss: require("mini-css-extract-plugin")
  };
module.exports = (env = {}, argv) => {
  const isProd = argv.mode === "production";

  let config = {
    context: path.resolve(__dirname, "src"),
    entry: {
      vendor: "./scripts/vendor.js",
      app: ["babel-polyfill", "./scripts/app.js"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "[name].[contentHash].bundle.js" : "[name].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [
            plugins.extractCss.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !isProd,
                plugins: () => [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !isProd,
                outputStyle: "expanded"
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /fonts/,
          use: "file-loader"
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          exclude: /img/,
          use: {
            loader: "url-loader"
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader",
            options: {
              minimize: isProd,
              removeComments: isProd,
              collapseWhitespace: isProd
            }
          }
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, "src"),
      port: 8080,
      overlay: {
        errors: true,
        warnings: true
      }
    },
    plugins: (() => {
      let common = [
        new plugins.extractCss({ filename: "styles/[name].css" }),
        new webpack.ProvidePlugin({ anime: "animejs" })
      ];
      let prod = [new plugins.clean()];
      let dev = [new plugins.html({ template: "index.html" })];
      return isProd ? common.concat(prod) : common.concat(dev);
    })(),
    devtool: isProd ? "" : "eval-source-map"
  };

  const optimize = () => {
    let minimizer = {
      optimizeCssAsset: require("optimize-css-assets-webpack-plugin"),
      terser: require("terser-webpack-plugin")
    };
    config.optimization = {
      runtimeChunk: "single",
      minimizer: [
        new minimizer.optimizeCssAsset(),
        new minimizer.terser(),
        new plugins.html({
          template: "index.html"
        })
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 20
          },
          common: {
            name: "common",
            chunks: "async",
            priority: 10,
            enforce: true,
            reuseExistingChunk: true,
            minChunks: 2
          }
        }
      }
    };
    return config;
  };

  return isProd ? optimize() : config;
};

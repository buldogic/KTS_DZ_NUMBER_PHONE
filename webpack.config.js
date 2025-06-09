const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const isProd = process.env.NODE_ENV === 'production';

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            esModule: false,
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(__dirname, './src/main.tsx'),
  target: ['web', 'es5'],
  devtool: isProd ? 'source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: isProd ? '[name].[contenthash].js' : 'bundle.js',
    publicPath: isProd ? '/KTS_dz_number_phone/' : '/',
    clean: true, // Webpack 5 feature - cleans output directory
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true,
    open: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: '.env.local',
      safe: false,
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      minify: isProd,
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    new TsCheckerPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      '@': srcPath,
      '@components': path.resolve(srcPath, 'components'),
      '@FormPhone': path.resolve(srcPath, 'FormPhone'),
      '@assets': path.resolve(srcPath, 'img'),
      '@styles': path.resolve(srcPath, 'styles'),
      '@utils': path.resolve(srcPath, 'utils'),
      '@types': path.resolve(srcPath, 'types'),
    },
  },
};

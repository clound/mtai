/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-11 15:55:55
 * @LastEditTime: 2020-07-12 17:28:21
 */

const {
  override,
  fixBabelImports,
  // addDecoratorsLegacy,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
} = require('customize-cra')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const path = require('path')
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const isEnvProduction = process.env.NODE_ENV === "production";
const myPlugin = [
  new UglifyJsPlugin(
    {
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }
  )
]
const addCompression = () => config => {
  if (isEnvProduction) {
    config.plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9
      })
    );
  }

  return config;
};

// 查看打包后各包大小
const addAnalyzer = () => config => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
}

module.exports = override(
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  // addDecoratorsLegacy(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/'),
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' } // 修改antd theme
    }
  }),
  addCompression(),
  addAnalyzer(),
  (config)=>{
    if(process.env.NODE_ENV!=="development") config.plugins = [...config.plugins,...myPlugin]
    return config
  }
)

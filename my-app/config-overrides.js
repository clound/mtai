/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-11 15:55:55
 * @LastEditTime: 2020-07-12 14:35:32
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
process.env.GENERATE_SOURCEMAP = "false";
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
  })
)

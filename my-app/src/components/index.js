/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 16:57:11
 * @LastEditTime: 2020-07-12 17:30:08
 */ 
import loadable from '@loadable/component'
// import Loading from './widget/Loading'
// import BasicForm from './forms/BasicForm'
const BasicTable = loadable({ loader: () => import('./tables/BasicTable') })
const Spins = loadable({ loader: () => import('./ui/Spins') })
const Dashboard = loadable({ loader: () => import('./dashboard/Dashboard') })
// import BasicTable from './tables/BasicTable'
// import Spins from './ui/Spins'
// import Dashboard from './dashboard/Dashboard'
// import AdvancedTable from './tables/AdvancedTables'
// import AsynchronousTable from './tables/AsynchronousTable'
// import Echarts from './charts/Echarts'
// import Recharts from './charts/Recharts'
// import Icons from './ui/Icons'
// import Buttons from './ui/Buttons'
// import Modals from './ui/Modals'
// import Notifications from './ui/Notifications'
// import Tabs from './ui/Tabs'
// import Banners from './ui/banners'
// import Drags from './ui/Draggable'
// import Gallery from './ui/Gallery'
// import BasicAnimations from './animation/BasicAnimations'
// import ExampleAnimations from './animation/ExampleAnimations'
// import AuthBasic from './auth/Basic'
// import RouterEnter from './auth/RouterEnter'
// import Cssmodule from './cssmodule'
// import MapUi from './ui/map'
// import QueryParams from './extension/QueryParams'

// const WysiwygBundle = loadable({
//   // 按需加载富文本配置
//   // loader: () => import('./ui/Wysiwyg'),
//   loading: Loading,
// })

export default {
  // BasicForm,
  BasicTable,
  // AdvancedTable,
  // AsynchronousTable,
  // Echarts,
  // Recharts,
  // Icons,
  // Buttons,
  Spins,
  // Modals,
  // Notifications,
  // Tabs,
  // Banners,
  // Drags,
  Dashboard,
  // Gallery,
  // BasicAnimations,
  // ExampleAnimations,
  // AuthBasic,
  // RouterEnter,
  // WysiwygBundle,
  // Cssmodule,
  // MapUi,
  // QueryParams,
}

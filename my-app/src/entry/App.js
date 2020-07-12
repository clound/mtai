/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-05 16:43:53
 * @LastEditTime: 2020-07-12 16:06:04
 */ 
import React, { Component } from 'react'
import { Layout } from 'antd'
import Routes from '@/router'
import SiderCustom from '@/components/SiderCustom'
import HeaderCustom from '@/components/HeaderCustom'
import { connect } from 'react-redux'
import { setResponsive } from '@/store/actions/app'
import './App.less'

const { Content } = Layout

class App extends Component {
  state = {
    collapsed: false,
    title: '',
  }
  componentDidMount() {
    console.log(this.props)
    // const { setAlitaState } = this.props
    // let user = umbrella.getLocalStorage('user')
    // user && setAlitaState({ stateName: 'auth', data: user })
    // this.getClientWidth()
    // window.onresize = () => {
      // console.log('屏幕变化了');
      // this.getClientWidth();
      // this.handleResize()
    // } 
    // this.openFNotification()
    // this.fetchSmenu()
  }
  getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const { setResponsive } = this.props
    const clientWidth = window.innerWidth
    setResponsive({
      type: 'RESPONSIVE',
      data: { isMobile: clientWidth <= 992 },
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    // const { title } = this.state;
    const { auth = { data: {} }, responsive = { data: {} } } = this.props
    return (
      <Layout>
        <Layout style={{ flexDirection: 'column' }}>
          <HeaderCustom
            toggle={this.toggle}
            collapsed={this.state.collapsed}
            user={auth.data || {}}
          />
          <Layout>
            {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
            <Content
              style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}
            >
              <Routes auth={auth} />
              {/* <Footer style={{ textAlign: 'center' }}>
                React-Admin ©{new Date().getFullYear()} Created by cloud
              </Footer> */}
            </Content>
          </Layout>
          
        </Layout>
      </Layout>
    )
  }
}
const mapStatetoProps = (state) => {
  let { auth, responsive } = state.app
  return { 
    auth,
    responsive
  }
}
const mapDispatchToProps = {
  setResponsive
}
export default connect(mapStatetoProps, mapDispatchToProps)(App)

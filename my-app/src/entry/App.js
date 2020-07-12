import React, { Component } from 'react'
import { Layout } from 'antd'
import Routes from '@/router'
import SiderCustom from '@/components/SiderCustom'
import HeaderCustom from '@/components/HeaderCustom'
import { connect } from 'react-redux'
import { setResponsive } from '@/store/actions/app'
import './App.less'

const { Content, Footer } = Layout

class App extends Component {
  state = {
    collapsed: false,
    title: '',
  }
  _resizeThrottled = false
  componentDidMount() {
    console.log(this.props)
    // const { setAlitaState } = this.props
    // let user = umbrella.getLocalStorage('user')
    // user && setAlitaState({ stateName: 'auth', data: user })
    this.getClientWidth()
    this.handleResize()
    // this.openFNotification()
    // this.fetchSmenu()
  }

  handleResize = () => {
    window.addEventListener('resize', this.resizeListener)
  }

  resizeListener = () => {
    const delay = 250
    if (!this._resizeThrottled) {
      this._resizeThrottled = true
      const timer = setTimeout(() => {
        this.getClientWidth()

        this._resizeThrottled = false
        clearTimeout(timer)
      }, delay)
    }
  }
  getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const { setResponsive } = this.props
    const clientWidth = window.innerWidth
    console.log(clientWidth)
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
  let { auth, responsive } = state
  return { 
    auth,
    responsive
  }
}
const mapDispatchToProps = {
  setResponsive
}
export default connect(mapStatetoProps, mapDispatchToProps)(App)

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Layout, Badge, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { BarsOutlined, MenuFoldOutlined, MenuUnfoldOutlined, NotificationOutlined, ArrowsAltOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import SiderCustom from './SiderCustom'
// import { gitOauthToken, gitOauthInfo } from '@/serve'
import { queryString } from '@/utils'
const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class HeaderCustom extends Component {
  state = {
    user: '',
    visible: false,
  }
  componentDidMount() {
    const QueryString = queryString()
    const _user = JSON.parse(localStorage.getItem('user')) || '测试'
    if (!_user && QueryString.hasOwnProperty('code')) {
      // gitOauthToken(QueryString.code).then((res) => {
      //   gitOauthInfo(res.access_token).then((info) => {
      //     this.setState({
      //       user: info,
      //     })
      //   })
      // })
      localStorage.setItem('user', JSON.stringify({}))
    } else {
      this.setState({
        user: _user,
      })
    }
  }
  screenFull = () => {
  //   if (screenfull.enabled) {
  //     screenfull.request()
  //   }
  }
  menuClick = (e) => {
    console.log(e)
    e.key === 'logout' && this.logout()
  }
  logout = () => {
    localStorage.removeItem('user')
    this.props.history.push('/login')
  }
  popoverHide = () => {
    this.setState({
      visible: false,
    })
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }
  render() {
    const { responsive = { data: {} }, path } = this.props
    console.log(this.props.collapsed);
    return (
      <Header className="custom-theme header">
        <div className="logo">茅台账号管理后台</div>
        {/* {responsive.data.isMobile ? (
          <Popover
            content={<SiderCustom path={path} popoverHide={this.popoverHide} />}
            trigger="click"
            placement="bottomLeft"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
          >
            <MenuUnfoldOutlined />222
          </Popover>
        ) : ( */}
        {this.props.collapsed ? 
           <MenuFoldOutlined className="menuIcon" onClick={this.props.toggle}/> :
            <MenuUnfoldOutlined className="menuIcon" onClick={this.props.toggle}/>
        }
        <Menu
          mode="horizontal"
          className="header-menu"
          onClick={this.menuClick}
        >
          <SubMenu
            title={
              <span className="avatar">
                {/* <img src={avater} alt="头像" /> */}
                <UserOutlined className="menuIcon"/>
                <i className="on bottom b-white" />
              </span>
            }
          >
            <MenuItemGroup title="用户中心">
              <Menu.Item key="setting:1">
                你好 - {this.props.user.userName}
              </Menu.Item>
              {/* <Menu.Item key="setting:2">个人信息</Menu.Item> */}
              <Menu.Item key="logout">
                <span onClick={this.logout}>退出登录</span>
              </Menu.Item>
            </MenuItemGroup>
            {/* <MenuItemGroup title="设置中心">
              <Menu.Item key="setting:3">个人设置</Menu.Item>
              <Menu.Item key="setting:4">系统设置</Menu.Item>
            </MenuItemGroup> */}
          </SubMenu>
        </Menu>
      </Header>
    )
  }
}
const mapStatetoProps = state=> {
  let { responsive } = state
  return {
    responsive
  }
}
export default withRouter(connect(mapStatetoProps)(HeaderCustom))

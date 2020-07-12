/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 16:16:17
 * @LastEditTime: 2020-07-11 11:43:55
 */ 
import React, { useState } from 'react'
import { Menu } from 'antd'
import  * as Icon from '@ant-design/icons'
import { Link } from 'react-router-dom'

const renderMenuItem = (
  item // item.route 菜单单独跳转的路由
) => (
  <Menu.Item key={item.key}>
    <Link to={(item.route || item.key) + (item.query || '')}>
      {/* {item.icon} */}
      {item.icon && React.createElement(Icon[item.icon], { className: "menuItemIcon"}) }
      <span className="nav-text">{item.title}</span>
    </Link>
  </Menu.Item>
)

const renderSubMenu = (item) => (
  <Menu.SubMenu
    key={item.key}
    title={
      <span>
        {item.icon && React.createElement(Icon[item.icon], { className: "menuItemIcon"}) }
        <span className="nav-text">{item.title}</span>
      </span>
    }
  >
    {item.subs.map((item) => renderMenuItem(item))}
  </Menu.SubMenu>
)

export default ({ menus, ...props }) => {
  const [dragItems] = useState(menus)
  return (
    <div>
      {dragItems.map((item, index) => (
        <div key={item.key}>
          <div>
            <Menu {...props}>
              {item.subs ? renderSubMenu(item) : renderMenuItem(item)}
            </Menu>
          </div>
        </div>
      ))}
    </div>
  )
}

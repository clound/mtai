/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 15:23:25
 * @LastEditTime: 2020-06-15 10:42:52
 */

import React from 'react'
// import img from '../../style/imgs/404.png'

class NotFound extends React.Component {
  state = {
    animated: '',
  }
  enter = () => {
    this.setState({ animated: 'hinge' })
  }
  render() {
    return (
      <div
        className="center"
        style={{ height: '100%', background: '#ececec', overflow: 'hidden' }}
      >
        not found
        {/* <img
          src={img}
          alt="404"
          className={`animated swing ${this.state.animated}`}
          onMouseEnter={this.enter}
        /> */}
      </div>
    )
  }
}

export default NotFound

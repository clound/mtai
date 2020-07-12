/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 15:23:15
 * @LastEditTime: 2020-07-12 16:23:03
 */

import React from 'react'
// import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { connect } from 'react-redux'
import './login.less'
import { setAuth } from '@/store/actions/app'
import { login } from '@/serve'

// import { RouteComponentProps } from 'react-router';
// import { FormProps } from 'antd/lib/form';
// import umbrella from 'umbrella-storage'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}
class Login extends React.Component {
  // componentDidMount() {
  //   const { setAlitaState } = this.props
  //   setAlitaState({ stateName: 'auth', data: null })
  // }
  // componentDidUpdate(prevProps) {
  //   // React 16.3+弃用componentWillReceiveProps
  //   const { auth, history } = this.props
  //   // const { history } = this.props;
  //   if (auth.data && auth.data.username) {
  //     // 判断是否登陆
  //     // localStorage.setItem('user', nextAuth.data)
  //     history.push('/')
  //   }
  // }
  onFinish = (values) => {
    const { setAuth, history } = this.props
    // console.log('Success:', values)
    // let { username, password } = values
    login(values).then(res => {
      if (res.code) {
        message.warning('对不起，你无权登录！')
        return
      } else {
        setAuth(values)
        history.push('/app/dashboard/index')
      }
    })
  }

  onFinishFailed = (errorInfo) => {
    // const { handleADD } = this.props
    message.warning('This is a warning message')
    console.log(errorInfo)
    // handleADD()
    console.log('Failed:', errorInfo)
  }
  render() {
    // const { count } = this.props
    return (
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <span>管理后台</span>
          </div>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
const mapStatetoProps = (state) => {
  return { auth: state.login.auth }
}
const mapDispatchToProps = {
  setAuth
}
export default connect(mapStatetoProps, mapDispatchToProps)(Login)

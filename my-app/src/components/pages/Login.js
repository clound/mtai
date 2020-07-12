/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 15:23:15
 * @LastEditTime: 2020-06-15 18:42:39
 */

import React from 'react'
// import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { connect } from 'react-redux'
import './login.less'
import { setAuth } from '@/store/actions/app'

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
  componentDidUpdate(prevProps) {
    // React 16.3+弃用componentWillReceiveProps
    console.log(this.props);
    const { auth, history } = this.props
    // const { history } = this.props;
    if (auth.data && auth.data.username) {
      // 判断是否登陆
      // localStorage.setItem('user', nextAuth.data)
      history.push('/')
    }
  }
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values)
  //       const { setAlitaState } = this.props
  //       if (values.userName === 'admin' && values.password === 'admin')
  //         setAlitaState({ funcName: 'admin', stateName: 'auth' })
  //       if (values.userName === 'guest' && values.password === 'guest')
  //         setAlitaState({ funcName: 'guest', stateName: 'auth' })
  //     }
  //   })
  // }
  onFinish = (values) => {
    const { setAuth } = this.props
    console.log('Success:', values)
    setAuth({ data: values })
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
            <span>React Admin</span>
          </div>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
const mapStatetoProps = (state) => {
  return { auth: state.app.auth.data }
}
const mapDispatchToProps = {
  setAuth
}
export default connect(mapStatetoProps, mapDispatchToProps)(Login)

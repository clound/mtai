/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-19 21:04:32
 * @LastEditTime: 2020-07-19 21:29:24
 */ 
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Button, Row, Input, Form } from 'antd'
// import { GlobalFooter } from 'components'
// import { GithubOutlined } from '@ant-design/icons'
import { Trans, withI18n } from '@lingui/react'
// import { setLocale } from 'utils'
import config from 'utils/config'

import styles from './index.less'

const FormItem = Form.Item

@withI18n()
@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class SignUp extends PureComponent {

  render() {
    const { dispatch, loading, i18n } = this.props
    
    const handleOk = values => {
      console.log(values)
      dispatch({ type: 'signup/signup', payload: values })
    }

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <span>{config.siteName}</span>
          </div>
          <Form
            onFinish={handleOk}
            >
            <FormItem name="username" 
              rules={[{ required: true }]} hasFeedback>
                <Input
                  placeholder={i18n.t`Username`}
                />
            </FormItem>
            <FormItem name="password"
              rules={[{ required: true }]} hasFeedback>
                <Input
                  type="password"
                  placeholder={i18n.t`Password`}
                />
            </FormItem>
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects.login}
              >
                <Trans>注册</Trans>
              </Button>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

SignUp.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default SignUp

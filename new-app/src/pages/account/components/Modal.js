import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
// import { Trans } from '@lingui/react'
// import city from 'utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class AccountModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          id: item.id,
        }
        // data.address = data.address.join(' ')
        onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  render() {
    const { i18n, item = {}, onOk, form, ...modalProps } = this.props
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" initialValues={{ ...item }} layout="horizontal">
          <FormItem name='phone' rules={[{ required: true, pattern: /^1[34578]\d{9}$/, message: i18n.t`The input is not valid phone!`, }]}
            label={i18n.t`Phone`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='passwd' rules={[{ required: true }]}
            label={i18n.t`Password`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AccountModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default AccountModal

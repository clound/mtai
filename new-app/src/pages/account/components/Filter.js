import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
// import { FilterItem } from 'components'
import { CloudUploadOutlined  } from '@ant-design/icons'
import { Trans } from '@lingui/react'
import { Button, Row, Col, Switch, Form, Input, message, Upload } from 'antd'
// import city from 'utils/city'
import { importExcel } from 'utils/tools'

const { Search } = Input
// const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Filter extends Component {
  formRef = React.createRef()

  handleFields = fields => {
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange } = this.props
    const values = this.formRef.current.getFieldsValue()
    const fields = this.handleFields(values)
    onFilterChange(fields)
  }

  handleReset = () => {
    const fields = this.formRef.current.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.formRef.current.setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { onFilterChange } = this.props
    let fields = this.formRef.current.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, onImport, onRefresh, uploading } = this.props
    // const { name, hit } = filter
    const importProps = {
      beforeUpload: (file) =>  {
        if (!/\.(xlsx|xls|csv)$/.test(file.name)) {
          message.error('仅支持上传.xlsx, .xls 后缀文件类型')
          return false
        }
        return false;
      },
      onChange: (file) => {
        importExcel(file.file).then(data => {
          onImport(data)
        })
      }
    }
    // let initialCreateTime = []
    // if (filter.createTime && filter.createTime[0]) {
    //   initialCreateTime[0] = moment(filter.createTime[0])
    // }
    // if (filter.createTime && filter.createTime[1]) {
    //   initialCreateTime[1] = moment(filter.createTime[1])
    // }

    return (
      <Form ref={this.formRef} name="control-ref" initialValues={{ name, choosed: false }}>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="name">
              <Search
                placeholder={`账号`}
                onSearch={this.handleSubmit}
              />
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 2 }}
            md={{ span: 2 }}
            id="choosed"
          >
            <Form.Item name="choosed" valuePropName='checked'>
            <Switch
              checkedChildren="中签"
              unCheckedChildren="全部" />
            </Form.Item>
          </Col>
          {/* <Col
            {...ColProps}
            xl={{ span: 4 }}
            md={{ span: 8 }}
            id="addressCascader"
          >
            <Form.Item name="address">
              <Cascader
                style={{ width: '100%' }}
                options={city}
                placeholder={i18n.t`Please pick an address`}
              />
            </Form.Item>
          </Col> */}
          <Col
            {...TwoColProps}
            xl={{ span: 18 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
          >
            <Row type="flex" align="middle" justify="space-between">
              <div>
                <Button
                  type="primary" htmlType="submit"
                  className="margin-right"
                  onClick={this.handleSubmit}
                >
                  <Trans>Search</Trans>
                </Button>
                <Button type="ghost"
                  className="margin-right"
                  onClick={onAdd}>
                  <Trans>添加账号</Trans>
                </Button>
                <Upload {...importProps}>
                  <Button type="primary"
                    shape="round"
                    loading={uploading}
                    icon={ <CloudUploadOutlined />}>
                    导入账号
                  </Button>
                </Upload>
                {/* <Button onClick={onImport}>
                  <Trans>导入账号</Trans>
                </Button> */}
                {/* <Button onClick={this.handleReset}>
                  <Trans>Reset</Trans>
                </Button> */}
              </div>
              <Button type="dashed" shape="round" onClick={onRefresh}>
                <Trans>更新账号信息</Trans>
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter

/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 17:12:35
 * @LastEditTime: 2020-07-12 16:09:59
 */

import React from 'react'
import { Space, Button, Switch, Table, Input, Modal, Form, Upload, message, notification, Tag } from 'antd';
import { UserAddOutlined, CloudUploadOutlined, SyncOutlined } from '@ant-design/icons'
import { parseTime, importExcel } from '@/utils'
import { importAccounts, addAccount, refreshInfo, getUserInfos } from '@/serve'
import './index.less'
const { Search } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: '账号',
    dataIndex: 'phone',
    width: '5%',
  },
  {
    title: '姓名',
    dataIndex: 'uname',
    width: '5%',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: '5%',
  },
  {
    title: '是否中签',
    dataIndex: 'choosed',
    width: '10%',
    render: (bool) => (
      bool ? <Tag color="green">中签</Tag> : <Tag>未中</Tag>
    )
  },
  {
    title: '报名店铺',
    dataIndex: 'city',
    // width: '20%',
  },
  {
    title: '中签日期',
    dataIndex: 'choosedDay',
    // width: '20%',
  },
  {
    title: '截止下单时间',
    dataIndex: 'limitDate',
    // width: '20%',
  },
  {
    title: '订单创建',
    dataIndex: 'limitDate',
    width: '10%',
    render: (bool) => (
      bool ? <Tag color="green">是</Tag> : <Tag>否</Tag>
    )
  },
  {
    title: '具体信息',
    dataIndex: 'tipInfo',
    // width: '20%'
  },
  {
    title: '更新日期',
    dataIndex: 'updatedAt',
    render: (time) => (
      <>
        {parseTime(time)}
      </>
    )
  },
];
class BasicTable extends React.Component {
  formRef = React.createRef()
  state = {
    uploading: false,
    visible: false,
    data: [],
    pagination: {
      phone: '',
      hit: false,
      current: 1,
      pageSize: 20,
    },
    loading: false,
  };
  componentDidMount() {
    const { pagination } = this.state;
    this.fetch(pagination);
  }
  openNotificationWithIcon = (type, title, content) => {
    notification[type]({
      message: title,
      description: content
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = e => {
    this.formRef.current.validateFields().then(values => {
      addAccount(values).then(res => {
        if (!res.code) {
          this.openNotificationWithIcon('success', '成功', '添加成功！')
          this.setState({
            visible: false
          })
        } else {
          this.openNotificationWithIcon('error', '失败', '添加失败！')
        }
      })
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleTableChange = (pagination) => {
    this.fetch(
      // sortField: sorter.field,
      // sortOrder: sorter.order,
      pagination,
    );
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    getUserInfos(params).then(res => {
      let data = (res.data.rows && res.data.rows.map(v => {
        return {
          id: v.id,
          phone: v.phone,
          ...v.mtuserinfo
        }
      })) || []
      this.setState({
        loading: false,
        data,
        pagination: {
          ...params,
          total: res.data.count,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    })
  };
  searchAccount = (value) => {
    if (value && !/^1[1-9][0-9]{9}$/.test(value)) {
      message.warning('请输入合法的手机号！')
      return
    }
    let data = Object.assign({}, this.state.pagination, { phone: value })
    this.setState({
      pagination: data
    })
    this.fetch(data)
  }
  onFilterHit = (value) => {
    let data = Object.assign({}, this.state.pagination, { hit: value })
    this.setState({
      pagination: data
    })
    this.fetch(data)
  }
  uploadAccount = (data) => {
    this.setState({
      uploading: true
    })
    importAccounts(data).then(res => {
      if (!res.code) {
        this.openNotificationWithIcon('success', '成功', '导入成功！')
        this.setState({
          uploading: false 
        })
      } else {
        this.openNotificationWithIcon('error', '失败', '导入失败！')
      }
    })
  }
  refresh = () => {
    refreshInfo().then(res => {
      if (!res.code) {
        this.openNotificationWithIcon('success', '成功', '刷新成功！')
      } else {
        this.openNotificationWithIcon('error', '失败', '刷新失败！')
      }
    })
  }
  render() {
    const { data, pagination, loading, uploading } = this.state;
    const props = {
      beforeUpload: (file) =>  {
        if (!/\.(xlsx|xls|csv)$/.test(file.name)) {
          message.error('仅支持上传.xlsx, .xls 后缀文件类型')
          return false
        }
        return false;
      },
      onChange: (file) => {
        importExcel(file.file).then(data => {
          this.uploadAccount(data)
        })
      }
    }
    return (
      <section className="data-container">
        <div className="top">
          <Space>
            <Search
                placeholder="输入手机账号"
                enterButton="查询账号"
                size="middle"
                style={{width: 300}}
                onSearch={this.searchAccount}
              />
              <Button type="primary"
                icon={ <UserAddOutlined /> }
                shape="round" onClick={this.showModal}>
                添加账号
              </Button>
              <Upload {...props}>
                <Button type="primary"
                  shape="round"
                  loading={uploading}
                  icon={ <CloudUploadOutlined />}>
                  导入账号
                </Button>
              </Upload>
              <Button type="dashed "
                icon={ <SyncOutlined />}
                shape="round" onClick={this.refresh}>
                刷新
              </Button>
              <Switch
                checkedChildren="中签"
                unCheckedChildren="全部"
                onChange={this.onFilterHit} />
          </Space>
        </div>
        <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        <Modal
          title="添加账号"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
          {...layout}
          ref={this.formRef}
          name="basic"
            >
            <Form.Item
              label="手机号"
              name="phone"
              rules={[{ 
                required: true,
                pattern: /^1[1-9][0-9]{9}$/,
                message: '请输入正确的手机号!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="passwd"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
            </Form>
        </Modal>
      </section>
    );
  }
}
export default BasicTable
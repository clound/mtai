import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
// import { Link } from 'umi'

import { parseTime } from 'utils/tools'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        key: 'index',
        title: '序列',
        dataIndex: 'index',
        width: '5%',
        fixed: 'left'
      },
      {
        key: 'phone',
        title: '姓名/账号',
        dataIndex: 'phone',
        width: '15%',
        fixed: 'left',
        render: (value, row, index) => {
          return (
            <div style={{wordWrap:'break-word',wordBreak:'break-word'}}>
              姓名：{row.uname || '无'}<br/>
              账号：{row.phone || '无'}<br/>
              手机号：{row.mobile || '无'}<br/>
              </div>
          )
        }
      },
      {
        key: 'choosed',
        title: '是否中签',
        dataIndex: 'choosed',
        width: '15%',
        render: (bool, row) => {
          return (
            <div style={{wordWrap:'break-word',wordBreak:'break-word'}}>
              中签：{row.choosed? <Tag color="green">中签</Tag> : <Tag>未中</Tag>}<br/>
              报名店铺：{row.city || '无'}<br/>
              中签日期：{row.choosedDay || '无'}<br/>
              截止下单时间：{row.limitDate || '无'}<br/>
              订单创建：{row.orderCreated? <Tag color="green">是</Tag> : <Tag>否</Tag>}<br/>
            </div>
        )}
      },
      {
        key: 'zqgq',
        title: '中秋活动',
        dataIndex: 'zqgq',
        textWrap: 'word-break',
        width: '15%',
        render: (text) => {
          let obj = (text && JSON.parse(text)) || {}
          return (
            <div style={{wordWrap:'break-word',wordBreak:'break-word'}}>
              {obj['choosed'] ? <Tag color="green">是</Tag> : <Tag>否</Tag>}<br/>
              申请店铺：{obj['cityName']}/{obj['shopName']}</div>
          )
        }
      },
      {
        key: 'mt15',
        title: '15茅台中签',
        dataIndex: 'mt15',
        textWrap: 'word-break',
        width: '15%',
        render: (text) => {
          let obj = (text && JSON.parse(text)) || {}
          return (
            <div style={{wordWrap:'break-word',wordBreak:'break-word'}}>
              {obj['choosed'] ? <Tag color="green">是</Tag> : <Tag>否</Tag>}<br/>
              申请店铺：{obj['cityName']}/{obj['shopName']}</div>
          )
        }
      },
      {
        key: 'jifen',
        title: '消费信息',
        dataIndex: 'jifen',
        textWrap: 'word-break',
        width: '20%',
        render: (text) => {
          let jifenArr = (text && JSON.parse(text)) || []
          return (
            jifenArr.map(v => {
              return <div style={{wordWrap:'break-word',wordBreak:'break-word'}}>消费时间：{v.transaction_time}/消费：{v.pay_amount|| 0}/积分：{v.points}</div>
            })
        )}
      },
      {
        key: 'updatedAt',
        title: '更新日期',
        dataIndex: 'updatedAt',
        fixed: 'right',
        width: '10%',
        render: (time) => (
          <>
            {parseTime(time)}
          </>
        )
      },
      {
        key: 'operation',
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List

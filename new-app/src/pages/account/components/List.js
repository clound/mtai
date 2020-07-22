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
        title: '序列',
        dataIndex: 'index',
        width: '5%',
      },
      {
        title: '账号',
        dataIndex: 'phone',
        width: '10%',
      },
      {
        title: '姓名',
        dataIndex: 'uname',
        width: '5%',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        width: '10%',
      },
      {
        title: '是否中签',
        dataIndex: 'choosed',
        width: '5%',
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
        width: '5%',
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
      {
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

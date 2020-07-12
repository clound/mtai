import React from 'react'
import { Row, Col, Card } from 'antd'
import BreadcrumbCustom from '../BreadcrumbCustom'
import { getStatistic } from '@/serve'
// import { TeamOutlined } from '@ant-design/icons'
// import EchartsViews from './EchartsViews'
// import EchartsProjects from './EchartsProjects'
// import b1 from '../../style/imgs/b1.jpg'

class Dashboard extends React.Component {
  state = {
    column: {
      accountNum: 0
    }
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.fetch()
    }, 20)
  }
  
  fetch = () => {
    getStatistic().then(res => {
      console.log(res)
      if (!res.code) {
        let count = res.count || 0
        let column = Object.assign({}, this.state.column, { accountNum: count })
        this.setState({
          column
        })
      }
    })
  }
  render() {
    let { column } = this.state
    return (
      <div className="gutter-example button-demo">
        <BreadcrumbCustom />
        <Row gutter={10}>
          <Col className="gutter-row" md={6}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    {/* <TeamOutlined className="text-2x text-danger"/>   */}
                    {/* <Icon type="heart" className="text-2x text-danger" /> */}
                  </div>
                  <div className="clear">
                    <div className="text-muted">账号总数</div>
                    <h2>{column.accountNum}</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          {/* <Col className="gutter-row" md={6}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="cloud" className="text-2x" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">云数据</div>
                    <h2>30122</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={6}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="camera" className="text-2x text-info" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">照片</div>
                    <h2>802</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={6}> 
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="mail" className="text-2x text-success" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">邮件</div>
                    <h2>102</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>*/}
        </Row>
      </div>
    )
  }
}

export default Dashboard

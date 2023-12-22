import { useEffect } from 'react';
import './index.scss'
import { Col, Row, Card } from 'antd';
import axios from 'axios';

export default function UserInfo() {

  useEffect(() => {
    

  }, [])

  return (
    <Row className='UserInfo'>
      <Col className='Col' span={6}>
        <Card className='Card' title="个人信息" bordered={false}>
          <p>Card content</p>
        </Card>
        
      </Col>
      <Col className='Col' span={6}>
        <Card className='Card' title="未发货" bordered={false}>
            <p>Card content</p>
        </Card>
      </Col>
      <Col className='Col' span={6}>
        <Card className='Card' title="已发货" bordered={false}>
            <p>Card content</p>
        </Card>
      </Col>
      <Col className='Col' span={6}>
        <Card className='Card' title="已收货" bordered={false}>
            <p>Card content</p>
        </Card>
      </Col>
    </Row>
  )
}

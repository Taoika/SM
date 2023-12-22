import { useEffect } from 'react';
import './index.scss'
import { Col, Row, Card, Button } from 'antd';
import { useAppSelector } from '../../../store/hook';

const gridStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
};

export default function UserInfo() {

  const { username, phone, address, permission } = useAppSelector(state => state.userInfo)


  return (
    <Row className='UserInfo'>
      <Col className='Col' span={6}>
        <Card title="个人信息" className='Card'>
          <Card.Grid style={gridStyle}><strong>用户名: </strong>{username}</Card.Grid>
          <Card.Grid style={gridStyle}><strong>电话号码: </strong>{phone}</Card.Grid>
          <Card.Grid style={gridStyle}><strong>地址: </strong>{address}</Card.Grid>
          <Card.Grid style={gridStyle}><strong>权限: </strong>{Number(permission) == 0 ? '管理员' : '普通用户'}</Card.Grid>
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

import './index.scss'
import { Col, Row, Card, Button } from 'antd';
import { useAppSelector } from '../../../store/hook';
import { useReq } from '../../../hooks/request';
import useGetInfo from '../../../hooks/useGetInfo';

export default function UserInfo() {

  const { username, phone, address, permission } = useAppSelector(state => state.userInfo)
  const { userGoods } = useAppSelector(state => state.goods)
  const { contextHolder, postReq } = useReq();
  const { getUserGoods, getAllGoods } = useGetInfo();

  const confirm = (ucId: number) => {
    const data = {
      ucId, 
      state: 3,
    }
    postReq('/alterCart', data).then(res => {
      getUserGoods();
      getAllGoods();
    })
  }

  const pay = [
    {
      time: '2023.12.9',
      amount: 103,
    },
    {
      time: '2023.12.11',
      amount: 33,
    },
    {
      time: '2023.12.15',
      amount: 66,
    }
  ]


  return (
    <Row className='UserInfo'>
      {contextHolder}
      <Col className='Col' span={5}>
        <Card title="个人信息" className='Card'>
          <Card.Grid className='grid'><strong>用户名: </strong>{username}</Card.Grid>
          <Card.Grid className='grid'><strong>电话号码: </strong>{phone}</Card.Grid>
          <Card.Grid className='grid'><strong>地址: </strong>{address}</Card.Grid>
          <Card.Grid className='grid'><strong>权限: </strong>{Number(permission) == 0 ? '管理员' : '普通用户'}</Card.Grid>
        </Card>
        
      </Col>
      <Col className='Col' span={5}>
        <Card className='Card' title="未发货" bordered={false}>
            <p>无</p>
        </Card>
      </Col>
      <Col className='Col' span={5}>
        <Card className='Card' title="已发货" bordered={false}>
          {
              userGoods.filter(value => value.ucState == 2).map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>{value.cargoName}</strong></p>
                  <p><strong>数量:</strong>{value.quantity}</p>
                  <Button onClick={()=>confirm(value.ucId)}>确认收货</Button>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
      <Col className='Col' span={5}>
        <Card className='Card' title="已收货" bordered={false}>
        {
              userGoods.filter(value => value.ucState == 3).map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>{value.cargoName}</strong></p>
                  <p><strong>数量:</strong>{value.quantity}</p>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
      <Col className='Col' span={4}>
        <Card className='Card' title="付款信息" bordered={false}>
            {
              pay.map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>时间:</strong>{value.time}</p>
                  <p><strong>金额:</strong>{value.amount}</p>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
    </Row>
  )
}

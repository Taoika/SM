import './index.scss'
import { useEffect } from 'react';
import { Col, Row, Card, Button } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import { setAllGoods } from '../../../store/slice/goods';
import { useReq } from '../../../hooks/request';

export default function Cargo() {

  const dispatch = useAppDispatch()
  const { allGoods, userGoods } = useAppSelector(state => state.goods)
  const { userId } = useAppSelector(state => state.userInfo)
  const { contextHolder, getReq, postReq } = useReq();

  useEffect(()=>{ // 获取全部商品信息
    getReq('/allGoods').then(res => {
      const data = res as any[]
      dispatch(setAllGoods(data))
    })
  },[userId]);

  const addToCart = (cargoId: number) => {
    postReq('/addToCart', {cargoId, userId}).then(res => {

    })
  }

  return (
    <Row className='Cargo'>
      {contextHolder}
      <Col className='Col' span={12}>
        <Card className='Card' title={`商品列表`} bordered={false}> 
            {
              allGoods.map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>{value.cargoName}</strong></p>
                  <p><strong>余货量: </strong>{value.quantity}</p>
                  <p><strong>店铺: </strong>{value.storeName}</p>
                  <Button onClick={()=>addToCart(value.cargoId)}>加入购物车</Button>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
      <Col className='Col' span={12}>
        <Card className='Card' title={`购物车`} bordered={false}> 
            {
              userGoods.map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>{value.cargoName}</strong></p>
                  <p><strong>余货量: </strong>{value.quantity}</p>
                  <Button>下单</Button>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
    </Row>
  )
}

import './index.scss'
import { useEffect } from 'react';
import { Col, Row, Card, Button } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import { setAllGoods, setUserGoods } from '../../../store/slice/goods';
import { useReq } from '../../../hooks/request';
import useGetInfo from '../../../hooks/useGetInfo';

export default function Cargo() {

  const dispatch = useAppDispatch()
  const { allGoods, userGoods } = useAppSelector(state => state.goods)
  const { userId } = useAppSelector(state => state.userInfo)
  const { contextHolder, getReq, postReq } = useReq();
  const { getUserGoods, getAllGoods } = useGetInfo();

  useEffect(()=>{ // 获取全部商品信息
    getAllGoods();
    getUserGoods();
  },[userId]);

  // 添加到购物车
  const addToCart = (cargoId: number) => {
    postReq('/addToCart', {cargoId, userId}).then(res => {
      getUserGoods();
      getAllGoods();
    })
  }

  // 移出购物车
  const removeFromCart = (ucId: number) => {
    postReq('/removeFromCart', ucId).then(res => {
      getUserGoods();
      getAllGoods();
    })
  }

  // 下单 这里暂且跳过发货步骤
  const order = (ucId: number, quantity: number) => {
    const data = {
      ucId, 
      quantity,
      state: 2,
    }
    postReq('/alterCart', data).then(res => {
      getUserGoods();
      getAllGoods();
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
              userGoods.filter(value => value.ucState == 0).map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>{value.cargoName}</strong></p>
                  <p><strong>数量: </strong>{value.quantity}</p>
                  <Button onClick={()=>order(value.ucId, value.quantity)}>下单</Button>
                  <Button onClick={()=>removeFromCart(value.ucId)}>删除</Button>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
    </Row>
  )
}

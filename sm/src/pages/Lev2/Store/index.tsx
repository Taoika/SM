import './index.scss'
import { useEffect, useState } from 'react';
import { Col, Row, Card, Button } from 'antd';
import AddGoods from '../../../components/AddGoods';
import ApplyStore from '../../../components/ApplyStore';
import { useReq } from '../../../hooks/request';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setStore, setCurrentStore } from '../../../store/slice/userInfo';
import { setStoreGoods } from '../../../store/slice/goods';
import useGetInfo from '../../../hooks/useGetInfo';

export default function Store() {

  const { userId, store, currentStore } = useAppSelector(state => state.userInfo)
  const { storeGoods } = useAppSelector(state => state.goods)
  const { contextHolder, getReq, postReq} = useReq()
  const dispatch = useAppDispatch()
  const { getStoreId, getGoods } = useGetInfo()

  useEffect(() => { // 获取全部自己的全部店铺信息
    if(!userId) return ;
    getReq('/storeInfo', 'userId', userId).then(
      res => {
        const data = res as any[];
        dispatch(setStore(data))
      }
    )
  },[userId])

  useEffect(()=>{
    getGoods()
  },[currentStore]);

  // 当前店铺
  const handleCurrentStore = (storeName: string, storeState: number) => {
    if(storeState == 1) {
      dispatch(setCurrentStore(storeName))
    }
  }

  // 下架商品
  const removeGoods = (cargoName: string) => {
    const data = {
      state: 1,
      cargoName,
  }
  postReq('/removeStore', data).then(
      res => {
        getGoods()
      }
  )
  }

  return (
    <Row className='Store'>
      {contextHolder}
      <Col className='Col' span={5}>
        <Card className='Card' title="店铺申请" bordered={false}>
            <ApplyStore/>
        </Card>
      </Col>
      <Col className='Col' span={5}>
        <Card title="店铺选择" className='Card'>
            { 
                store.map(value => (
                    <Card.Grid 
                        className='grid aStore' 
                        hoverable={value.storeState == 1 ? true : false}
                        key={value.storeName} 
                        onClick={()=>handleCurrentStore(value.storeName, value.storeState)}
                    >
                        <p><strong>店铺名:</strong>{value.storeName}</p>
                        <p><strong>店铺状态:</strong>{
                          value.storeState == 0 ? '申请中' 
                          : value.storeState == 1 ? '正常' 
                          : value.storeState == 2 ? '已驳回' 
                          : '已冻结'
                        }</p>
                        <p><strong>创建时间:</strong>{value.launchDate.split('T')[0]}</p>
                    </Card.Grid>
                ))
            }
        </Card>
      </Col>
      <Col className='Col' span={6}>
        <Card className='Card' title={`商品上架(店铺：${currentStore})`} bordered={false}>
            <AddGoods/>
        </Card>
      </Col>
      <Col className='Col' span={4}>
        <Card className='Card' title={`商品列表(店铺：${currentStore})`} bordered={false}> 
            {
              storeGoods.filter(value => value.cargoState == 0).map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>{value.cargoName}</strong></p>
                  <p><strong>余货量: </strong>{value.quantity}</p>
                  <Button onClick={()=>removeGoods(value.cargoName)}>下架</Button>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
      <Col className='Col' span={4}>
        <Card className='Card' title={`已下架商品(店铺：${currentStore})`} bordered={false}> 
            {
              storeGoods.filter(value => value.cargoState == 1).map(value => (
                <Card.Grid className='grid goods'>
                  <p><strong>{value.cargoName}</strong></p>
                  <p><strong>余货量: </strong>{value.quantity}</p>
                  <Button>下架</Button>
                </Card.Grid>
              ))
            }
        </Card>
      </Col>
    </Row>
  )
}

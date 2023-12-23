import './index.scss'
import { useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import AddGoods from '../../../components/AddGoods';
import ApplyStore from '../../../components/ApplyStore';
import { useReq } from '../../../hooks/request';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setStore } from '../../../store/slice/userInfo';

// 店铺列表
const myStore = [
    { 
        storeName: '111',
        storeState: 0,
        launchDate: '2002.2.3'
    },
    { 
        storeName: '222',
        storeState: 0,
        launchDate: '2002.2.3'
    },
    { 
        storeName: '333',
        storeState: 0,
        launchDate: '2002.2.3'
    }
]

export default function Store() {

  const { userId, store } = useAppSelector(state => state.userInfo)
  const { contextHolder, getReq} = useReq()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!userId) return ;
    getReq('/storeInfo', userId).then(
      res => {
        const data = res as any[];
        dispatch(setStore(data))
        
      }
    )
  },[userId])

  return (
    <Row className='Store'>
      {contextHolder}
      <Col className='Col' span={5}>
        <Card className='Card' title="店铺申请" bordered={false}>
            <ApplyStore/>
        </Card>
      </Col>
      <Col className='Col' span={4}>
        <Card title="店铺选择" className='Card'>
            { 
                store.map(value => (
                    <Card.Grid className='grid aStore' key={value.storeName}>
                        <p><strong>店铺名:</strong>{value.storeName}</p>
                        <p><strong>店铺状态:</strong>{value.storeState == 0 ? '申请中' : '正常'}</p>
                        <p><strong>创建时间:</strong>{value.launchDate.split('T')[0]}</p>
                    </Card.Grid>
                ))
            }
        </Card>
      </Col>
      <Col className='Col' span={6}>
        <Card className='Card' title="商品上架" bordered={false}>
            <AddGoods/>
        </Card>
      </Col>
      <Col className='Col' span={9}>
        <Card className='Card' title="商品列表" bordered={false}>
            <p>Card content</p>
        </Card>
      </Col>
    </Row>
  )
}

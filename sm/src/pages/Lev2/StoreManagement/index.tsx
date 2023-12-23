import './index.scss'
import { useEffect } from 'react';
import { Col, Row, Card, Button } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import { setApplying, setInOperation, setDismissed, setDeprecated } from '../../../store/slice/allStore';
import { useReq } from '../../../hooks/request';

export default function StoreManagement() {

    const { applying, inOperation, dismissed, deprecated} = useAppSelector(state => state.allStore)
    const dispatch = useAppDispatch()
    const { contextHolder, getReq, postReq} = useReq()

    const getAllStore = () => {
        getReq('/allStoreInfo').then(
            res => {
                const data = res as any[];
                const applyingStore = data.filter(value => value.storeState == 0)
                const inOperationStore = data.filter(value => value.storeState == 1)
                const dismissedStore = data.filter(value => value.storeState == 2)
                const deprecatedStore = data.filter(value => value.storeState == 3)
                dispatch(setApplying(applyingStore))
                dispatch(setInOperation(inOperationStore))
                dispatch(setDismissed(dismissedStore))
                dispatch(setDeprecated(deprecatedStore))
            }
        )
    }

    useEffect(()=>{
        getAllStore()
    },[]);

    // 处理店铺
    const handleAlter = (storeName: string, state: number) => {
        const data = {
            state,
            storeName,
        }
        postReq('/handleStore', data).then(
            res => {
                getAllStore()
            }
        )
    }

  return (
    <Row className='StoreManagement'>
        {contextHolder}
      <Col className='Col' span={6}>
        <Card title="申请中" className='Card'>
            { 
                applying.map(value => (
                    <Card.Grid className='grid aStore' key={value.storeName}>
                        <p><strong>店铺名:</strong>{value.storeName}</p>
                        <Button onClick={()=>handleAlter(value.storeName, 1)}>同意</Button>
                        <Button onClick={()=>handleAlter(value.storeName, 2)}>拒绝</Button>
                    </Card.Grid>
                ))
            }
        </Card>
        
      </Col>
      <Col className='Col' span={6}>
        <Card title="运作中" className='Card'>
            { 
                inOperation.map(value => (
                    <Card.Grid className='grid aStore' key={value.storeName}>
                        <p><strong>店铺名:</strong>{value.storeName}</p>
                        <Button onClick={()=>handleAlter(value.storeName, 3)}>冻结</Button>
                    </Card.Grid>
                ))
            }
        </Card>
        
      </Col>
      <Col className='Col' span={6}>
        <Card title="已驳回" className='Card'>
            { 
                dismissed.map(value => (
                    <Card.Grid className='grid aStore' key={value.storeName}>
                        <p><strong>店铺名:</strong>{value.storeName}</p>
                    </Card.Grid>
                ))
            }
        </Card>
        
      </Col>
      <Col className='Col' span={6}>
        <Card title="已废弃" className='Card'>
            { 
                deprecated.map(value => (
                    <Card.Grid className='grid aStore' key={value.storeName}>
                        <p><strong>店铺名:</strong>{value.storeName}</p>
                        <Button onClick={()=>handleAlter(value.storeName, 1)}>解冻</Button>
                    </Card.Grid>
                ))
            }
        </Card>
        
      </Col>
    </Row>
  )
}

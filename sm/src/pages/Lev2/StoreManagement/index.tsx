import './index.scss'
import { Col, Row, Card, Button } from 'antd';
import { useAppSelector } from '../../../store/hook';

export default function StoreManagement() {

    const { applying, inOperation, deprecated} = useAppSelector(state => state.allStore)

  return (
    <Row className='StoreManagement'>
      <Col className='Col' span={6}>
        <Card title="申请中" className='Card'>
            { 
                applying.map(value => (
                    <Card.Grid className='grid aStore' key={value.storeName}>
                        <p><strong>店铺名:</strong>{value.storeName}</p>
                        <p><strong>铺主:</strong>{value.userName}</p>
                        <p><strong>创建时间:</strong>{value.launchDate.split('T')[0]}</p>
                    </Card.Grid>
                ))
            }
        </Card>
        
      </Col>
      <Col className='Col' span={6}>
        <Card title="运作中" className='Card'>

        </Card>
        
      </Col>
      <Col className='Col' span={6}>
        <Card title="已废弃" className='Card'>

        </Card>
        
      </Col>
    </Row>
  )
}

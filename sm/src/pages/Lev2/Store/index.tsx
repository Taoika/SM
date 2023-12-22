import './index.scss'
import { Col, Row, Card } from 'antd';
import AddGoods from '../../../components/AddGoods';

const myStore = [
    { 
        storeName: '111',
        storeState: 0,
        launchDate: '2002.2.3'
    },
    { 
        storeName: '111',
        storeState: 0,
        launchDate: '2002.2.3'
    },
    { 
        storeName: '111',
        storeState: 0,
        launchDate: '2002.2.3'
    }
]

export default function Store() {
  return (
    <Row className='Store'>
      <Col className='Col' span={4}>
        <Card title="店铺选择" className='Card'>
          <Card.Grid className='grid'>新建店铺</Card.Grid>
            { 
                myStore.map(value => (
                    <>
                        <Card.Grid className='grid aStore'>
                            <p><strong>店铺名:</strong>{value.storeName}</p>
                            <p><strong>店铺状态:</strong>{value.storeState}</p>
                            <p><strong>创建时间:</strong>{value.launchDate}</p>
                        </Card.Grid>
                    </>
                ))
            }
        </Card>
        
      </Col>
      <Col className='Col' span={8}>
        <Card className='Card' title="商品上架" bordered={false}>
            <AddGoods/>
        </Card>
      </Col>
      <Col className='Col' span={12}>
        <Card className='Card' title="商品列表" bordered={false}>
            <p>Card content</p>
        </Card>
      </Col>
    </Row>
  )
}

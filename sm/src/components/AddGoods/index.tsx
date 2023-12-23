import './index.scss'
import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { useAppSelector } from '../../store/hook';
import { useReq } from '../../hooks/request';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '请填写商品${label}',
  number: {
    range: '${label} must be greater than ${min}',
  },
};

export default function AddGoods() {

  const { contextHolder, postReq} = useReq()
  const { currentStore, store } = useAppSelector(state => state.userInfo)

  const onFinish = (values: any) => {
    console.log(values);
    const { cargoName, price, quantity } = values
    const storeId = store.filter(value => value.storeName == currentStore)[0].storeId;
    postReq('/handleGoods', { storeId, cargoName, price, quantity })
  };

  return (
    <Form
      className='AddGoods'
      {...layout}
      name="AddGoods_form"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
        {contextHolder}
        <Form.Item name='cargoName' label="商品名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='quantity' label="数量" rules={[{ type: 'number', min: 0, required: true}]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name='price' label="价格(元)" rules={[{ type: 'number', min: 0, required: true}]}>
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            上架
          </Button>
        </Form.Item>
    </Form>
  )
}

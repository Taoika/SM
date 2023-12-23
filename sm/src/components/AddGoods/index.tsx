import './index.scss'
import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '请填写商品${label}',
  number: {
    range: '${label} must be greater than ${min}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
};

export default function AddGoods() {
  return (
    <Form
    className='AddGoods'
    {...layout}
    name="AddGoods_form"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
  >
    <Form.Item name='cargoName' label="商品名" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name='quantity' label="数量" rules={[{ type: 'number', min: 0, required: true}]}>
      <InputNumber />
    </Form.Item>
    <Form.Item name='price' label="价格" rules={[{ type: 'number', min: 0, required: true}]}>
      <InputNumber />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
      <Button type="primary" htmlType="submit">
        出售
      </Button>
    </Form.Item>
  </Form>
  )
}

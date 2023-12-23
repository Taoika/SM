import './index.scss'
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useReq } from '../../hooks/request';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '请填写商品${label}',
};

export default function ApplyStore() {

    const { userId } = useAppSelector(state => state.userInfo)
    const { contextHolder, postReq } = useReq()

    const onFinish = (values: any) => {
        const { storeName } = values;
        const data = {
            userId,
            storeName,
        }
        postReq('/applyStore', data);
      };

  return (
    <Form
        className='ApplyStore'
        {...layout}
        name="ApplyStore_form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
    >
        {contextHolder}
        <Form.Item name='storeName' label="铺名" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <Button type="primary" htmlType="submit">
                申请
            </Button>
        </Form.Item>
  </Form>
  )
}

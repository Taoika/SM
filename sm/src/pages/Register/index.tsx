import './index.scss'
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';

const { Option } = Select;

export default function Register() {

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );

  return (
    <div className='Register'>
        <Form
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="registerForm"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >

        <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入昵称!', whitespace: true }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="password"
            label="密码"
            rules={[
            {
                required: true,
                message: '请输入密码!',
            },
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: '请确认密码!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="phone"
            label="电话号码"
            rules={[{ required: true, message: '请输入电话号码!' }]}
        >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <Button type="primary" htmlType="submit">
            注册
            </Button>
        </Form.Item>
        </Form>
    </div>
  )
}

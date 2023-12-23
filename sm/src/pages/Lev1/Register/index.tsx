import './index.scss'
import { useNavigate } from 'react-router-dom'
import { useReq } from '../../../hooks/request';
import { LoginOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setUsername } from '../../../store/slice/userInfo';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';

const { Option } = Select;

export default function Register() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { contextHolder, postReq } = useReq();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
      const { password, phone, username } = values
      const data = { password, phone, username }
      postReq('/register', data).then(
        res => {
          localStorage.setItem('SM_user', JSON.stringify({username}))
          dispatch(setUsername(username))
          navigate('/Home');
        }
      )
    };
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );

    const toLogin = () => {
      navigate('/Login');
    }

  return (
    <div className='Register'>
        {contextHolder}
        <div className="toLogin" onClick={toLogin}>
          <LoginOutlined />
        </div>
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

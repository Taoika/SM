import './index.scss'
import { useNavigate } from 'react-router-dom';
import { PicCenterOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd';
import { useReq } from '../../../hooks/request';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setUsername } from '../../../store/slice/userInfo';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { contextHolder, postReq } = useReq();

  const onFinish = (values: any) => {
    postReq('/login', values).then(
      res => {
        if(res) {
          dispatch(setUsername(values.username))
          localStorage.setItem('SM_user', JSON.stringify({username: values.username}))
          navigate('/Home');
        }
      }
    )
  };

  const toRegister = () => {
    navigate('/Register')
  }

  return (
    <div className='Login'>
      {contextHolder}
      <div className="toRegister" onClick={toRegister}>
        <PicCenterOutlined />
      </div>
      <Form
        name="loginForm"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

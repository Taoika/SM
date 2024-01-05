import { useEffect } from 'react';
import './index.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setUsername } from '../../../store/slice/userInfo';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons'
import Nav from '../../../components/Nav';
import { Layout } from 'antd';
import { useIdentidy } from '../../../hooks/useIdentidy';
import useGetInfo from '../../../hooks/useGetInfo';


export default function Home() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { contextHolder, getUserInfo} = useGetInfo()
  useIdentidy(); // 身份验证

  const { username, userId } = useAppSelector(state => state.userInfo)

  useEffect(()=>{ // 获取用户信息    
    getUserInfo()
  }, [username, userId])

  const handleLogout = () => {
    dispatch(setUsername(''))
    localStorage.removeItem('SM_user');
    navigate('/Login');
  }

  return (
    <Layout className='Home'>
      {contextHolder}
      <div className="logout" onClick={handleLogout}>
        <LoginOutlined />
      </div>
      <Nav/>
      <Outlet/>
    </Layout>
  )
}

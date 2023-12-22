import { useEffect } from 'react';
import './index.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setUsername } from '../../../store/slice/userInfo';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons'
import Nav from '../../../components/Nav';
import { Layout } from 'antd';
import { useIdentidy } from '../../../hooks/useIdentidy';
import axios from 'axios';

export default function Home() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useIdentidy(); // 身份验证

  const { username } = useAppSelector(state => state.userInfo)

  useEffect(()=>{
    console.log(username);
    
    if(!username) return;
    axios.get(`http://localhost:8633/personInfo?username=${username}`).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);

      }
    )
  }, [username])

  const handleLogout = () => {
    dispatch(setUsername(''))
    localStorage.removeItem('SM_user');
    navigate('/Login');
  }

  return (
    <Layout className='Home'>
      <div className="logout" onClick={handleLogout}>
        <LoginOutlined />
      </div>
      <Nav/>
      <Outlet/>
    </Layout>
  )
}

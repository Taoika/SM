import './index.scss'
import { HomeOutlined, UserOutlined, ShopOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const navContent = [
    {
        key: 'Cargo',
        icon: <HomeOutlined />,
        label: <Link to='Cargo'>主页</Link>,
    },
    {
        key: 'UserInfo',
        icon: <UserOutlined />,
        label: <Link to='UserInfo'>我的</Link>,
    },
    {
        key: 'Store',
        icon: <ShopOutlined />,
        label: <Link to='Store'>我的店铺</Link>,
    },
    {
        key: 'StoreManagement',
        icon: <ShareAltOutlined />,
        label: <Link to='StoreManagement'>店铺管理</Link>,
    },
]

export default function Nav() {

  return (
    <Header className='Nav'>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={navContent}
            style={{ flex: 1, minWidth: 0 }}
        />
    </Header>
  )
}

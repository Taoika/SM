import Login from "../pages/Lev1/Login";
import Register from "../pages/Lev1/Register";
import Home from "../pages/Lev1/Home";
import Cargo from "../pages/Lev2/Cargo";
import UserInfo from "../pages/Lev2/UserInfo";
import Store from "../pages/Lev2/Store";
import StoreManagement from "../pages/Lev2/StoreManagement";

const routes = [
    // 登录页
    {
        path: '/Login',
        element: <Login />,
    },
    {
        path: '/Register',
        element: <Register />,
    },
    {
        path: '/Home',
        element: <Home />,
        children: [
            {
                path: 'Cargo',
                element: <Cargo />,
            },
            {
                path: 'UserInfo',
                element: <UserInfo />,
            },
            {
                path: 'Store',
                element: <Store />,
            },
            {
                path: 'StoreManagement',
                element: <StoreManagement />,
            },
            {
                path: '',
                element: <Cargo />,
            },
        ]
    },
    {
        path: '/',
        element: <Register />,
    },
]

export default routes;
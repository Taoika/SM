import Login from "../pages/Lev1/Login";
import Register from "../pages/Lev1/Register";
import Home from "../pages/Lev1/Home";
import Cargo from "../pages/Lev2/Cargo";
import ShoppingCart from "../pages/Lev2/ShoppingCart";
import UserInfo from "../pages/Lev2/UserInfo";

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
                path: 'ShoppingCart',
                element: <ShoppingCart />,
            },
            {
                path: 'UserInfo',
                element: <UserInfo />,
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
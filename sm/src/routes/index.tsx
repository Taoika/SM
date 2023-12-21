import Login from "../pages/Login";
import Home from "../pages/Home";

const routes = [
    // 登录页
    {
        path: '/Login',
        element: <Login />,
    },
    {
        path: '/Home',
        element: <Home />,
    },
    {
        path: '/',
        element: <Login />,
    },
]

export default routes;
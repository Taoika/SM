import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

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
    },
    {
        path: '/',
        element: <Login />,
    },
]

export default routes;
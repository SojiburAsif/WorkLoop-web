import {
    createBrowserRouter,

} from "react-router";
import Root from "./Root";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Error from "../Error/Error";
import Home from "../Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [{
            index: true,
            Component: Home,
            path: '/'
        }

        ]
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: '/register',
        Component: Register
    },
    {
        path: "*",
        element: <Error />,
    },
]);
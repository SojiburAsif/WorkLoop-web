import {
    createBrowserRouter,

} from "react-router";
import Root from "./Root";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Error from "../Error/Error";
import Home from "../Home/Home";
import AddTask from "../Form/DataAdd";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [{
            index: true,
            Component: Home,
            path: '/'
        },
        {
            path: 'addtask',
            Component: AddTask
        },

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
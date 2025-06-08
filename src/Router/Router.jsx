import {
    createBrowserRouter,

} from "react-router";
import Root from "./Root";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Error from "../Error/Error";
import Home from "../Home/Home";
import AddTask from "../Form/DataAdd";
import SinglePage from "../Page/SinglePage";
import PrivateRouter from "../Contexts/PrivateRouter";
import Services from "../Page/Services";

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
        {
            path: '/working/:id',
            element: <PrivateRouter>
                <SinglePage></SinglePage>
            </PrivateRouter>,
            loader: ({params})=> fetch(`http://localhost:3000/working/${params.id}`)
        },
        {
            path: '/services',
            element: <Services></Services>
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
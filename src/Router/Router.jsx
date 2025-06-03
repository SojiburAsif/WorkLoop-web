import {
    createBrowserRouter,

} from "react-router";
import Root from "./Root";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Error from "../Error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
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
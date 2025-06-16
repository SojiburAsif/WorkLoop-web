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
import BookingForm from "../Page/Booking";
import Manage from "../Page/Manage";
import EditServices from "../EditServices/EditServices";
import MyBooking from "../Page/MyBooking";
import ToDo from "../Page/ToDo";


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
            element: <PrivateRouter>
                <AddTask></AddTask>
            </PrivateRouter>
        },
        {
            path: '/working/:id',
            element: <PrivateRouter>
                <SinglePage></SinglePage>
            </PrivateRouter>,
            loader: ({ params }) => fetch(`https://backend-zeta-ochre-92.vercel.app/working/${params.id}`)
        },
        {
            path: '/services',
            element: <Services></Services>
        },
        {
            path: 'booking/:id',
            element: <PrivateRouter><BookingForm></BookingForm></PrivateRouter>,
            loader: ({ params }) => fetch(`https://backend-zeta-ochre-92.vercel.app/working/${params.id}`)
        },
        {
            path: '/manage-service',
            element: <PrivateRouter>
                <Manage></Manage>
            </PrivateRouter>
        },
        {
            path: '/EditServices/:id',
            element: <PrivateRouter>
                <EditServices></EditServices>
            </PrivateRouter>,
            loader: ({ params }) => fetch(`https://backend-zeta-ochre-92.vercel.app/working/${params.id}`)
        },
        {
            path: '/booked-services',
            element: <PrivateRouter>
                <MyBooking></MyBooking>
            </PrivateRouter>,
        },
        {
            path: '/service-to-do',
            element: <PrivateRouter>
                <ToDo></ToDo>
            </PrivateRouter>
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
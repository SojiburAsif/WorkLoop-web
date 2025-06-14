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
            loader: ({ params }) => fetch(`http://localhost:3000/working/${params.id}`)
        },
        {
            path: '/services',
            element: <Services></Services>
        },
        {
            path: 'booking/:id',
            element: <PrivateRouter><BookingForm></BookingForm></PrivateRouter>,
            loader: ({ params }) => fetch(`http://localhost:3000/working/${params.id}`)
        },
        {
            path: '/manage-service',
            element: <PrivateRouter>
                <Manage></Manage>
            </PrivateRouter>
        },
        {
            path: '/EditServices/:id',
            Component: EditServices,   // JSX নয়, সরাসরি কম্পোনেন্ট রেফারেন্স
            loader: ({ params }) => fetch(`http://localhost:3000/working/${params.id}`)
        },
        {
            path: '/booked-services',
            element: <PrivateRouter>
                <MyBooking></MyBooking>
            </PrivateRouter>,
            

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
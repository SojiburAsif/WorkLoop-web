import { createBrowserRouter } from "react-router";
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
import DashbordLayout from "../Dashbord/Main/DashbordLayout";
import MainDashbord from "../Dashbord/Main/MainDashbord";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/services",
                element: <Services />
            },
        ]
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRouter>
                <DashbordLayout />
            </PrivateRouter>
        ),
        children: [
            {
                index: true,
                element: <MainDashbord />
            },
            {
                path: "addtask",
                element: (
                    <PrivateRouter>
                        <AddTask />
                    </PrivateRouter>
                )
            },
            {
                path: "working/:id",
                element: (
                    <PrivateRouter>
                        <SinglePage />
                    </PrivateRouter>
                ),
                loader: ({ params }) =>
                    fetch(`https://services-server.vercel.app/working/${params.id}`)
            },

            {
                path: "booking/:id",
                element: (
                    <PrivateRouter>
                        <BookingForm />
                    </PrivateRouter>
                ),
                loader: ({ params }) =>
                    fetch(`https://services-server.vercel.app/working/${params.id}`)
            },
            {
                path: "manage-service",
                element: (
                    <PrivateRouter>
                        <Manage />
                    </PrivateRouter>
                )
            },
            {
                path: "EditServices/:id",
                element: (
                    <PrivateRouter>
                        <EditServices />
                    </PrivateRouter>
                ),
                loader: ({ params }) =>
                    fetch(`https://services-server.vercel.app/working/${params.id}`)
            },
            {
                path: "booked-services",
                element: (
                    <PrivateRouter>
                        <MyBooking />
                    </PrivateRouter>
                )
            },
            {
                path: "service-to-do",
                element: (
                    <PrivateRouter>
                        <ToDo />
                    </PrivateRouter>
                )
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <Error />
    }
]);

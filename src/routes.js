import React from "react"
import {
    createBrowserRouter,
} from "react-router-dom";
import {Login} from "./pages/Login/Login"
import {Home} from "./pages/Home/Home"

export const router = createBrowserRouter([
    {
        path: "login",
        element: <Login/>,
    },
    {
        path: "home",
        element: <Home/>,
    },
]);


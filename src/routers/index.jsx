
import React from 'react'
import { Dashboard } from '../pages/dashboard/components/Dashboard';
import ListProject from '../pages/project/components/ListProject';
import EmployeeDetail from "../pages/employee/components/EmployeeDetail.jsx";
import ShowEmployees from "../pages/employee/EmployeeManagement.jsx";

const AppRoutes = [
    { path: "/", element: <Dashboard /> , title:"Dashboard"  },
    { path: "/listproject", element: <ListProject/>, title:"List Project" },
    {
        path: "/listemployee",
        element: <ShowEmployees />,
        errorElement: <div>Not found</div>,
        title:"List Employee"

    },
    {
        path: "/employee/:id",
        element: <EmployeeDetail />,
        title:"Edit Employee"

        // errorElement: <div>Not found</div>,
    },
    {
        path: "/login",
        // element: <ShowEmployees />,
    },
]

export default AppRoutes;



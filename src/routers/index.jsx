
import React from 'react'
import { Dashboard } from '../pages/dashboard/components/Dashboard';
import ListProject from '../pages/project/ListProject';
import EmployeeDetail from "../pages/employee/components/EmployeeDetail.jsx";
import ShowEmployees from "../pages/employee/EmployeeManagement.jsx";
import { ProjectDetail } from '../pages/project/components/ProjectDetail.jsx';


const AppRoutes = [
    { path: "/", element: <Dashboard /> , title:"Dashboard"  },
    { path: "/listproject", element: <ListProject/>, title:"List Project" },
    {
        path: "/project/:id",
        element: <ProjectDetail />,
        title:"Edit Project"
    },
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
        path: "/logout",

        // element: <Login />,
    },


]

export default AppRoutes;



]);


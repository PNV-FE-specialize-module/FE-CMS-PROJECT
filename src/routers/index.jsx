
import React from 'react'
import { Dashboard } from '../pages/dashboard/components/Dashboard';
import ListProject from '../pages/project/ListProject';
import EmployeeDetail from "../pages/employee/components/EmployeeDetail.jsx";
import ShowEmployees from "../pages/employee/EmployeeManagement.jsx";
import { ResetPwd } from '../components/auth/reset-password/index.jsx';
import { Logout } from '../components/auth/logout/index.jsx';
import { ProjectDetail } from '../pages/project/components/ProjectDetail.jsx';
import CreateEmployee from "../pages/employee/components/AddEmployee.jsx";


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
        title:"List Employee",
        children: [
            { path: 'addEmployee', element: <CreateEmployee />, title: 'Add Employee' },
        ],

    },
    {
        path: "/employee/:id",
        element: <EmployeeDetail />,
        title:"Edit Employee"

    },
    {
        path: "/addEmployee",
        element: <CreateEmployee />,
        title:"Create Employee"

    },

    {
        path: "/resetPwd",
        element: <ResetPwd/>,
        title: 'Reset Password'
    },

    {
        path: "/signout",
        element: <Logout/>,
        title: 'Signout'
    },
]

export default AppRoutes;





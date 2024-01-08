
import React from 'react'
import { Dashboard } from '../pages/dashboard/components/Dashboard';
import ListProject from '../pages/project/ListProject';
import EmployeeDetail from "../pages/employee/components/EmployeeDetail.jsx";
import ShowEmployees from "../pages/employee/EmployeeManagement.jsx";
import { ResetPwd } from '../components/auth/reset-password/index.jsx';
import { ProjectDetail } from '../pages/project/components/ProjectDetail.jsx';
import AddProject from '../pages/project/components/AddProject.jsx';
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

    },
    {
        path: "/employee/:id",
        element: <EmployeeDetail />,
        title:"Edit Employee"

    },
    {
        path: "/addProject",
        element: <AddProject />,
        title:"Edit Employee"

        // errorElement: <div>Not found</div>,
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

]

export default AppRoutes;





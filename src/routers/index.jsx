import React from 'react'
import { Dashboard } from '../pages/dashboard/components/Dashboard';
import ListProject from '../pages/project/components/ListProject';
import { EmployeeDetail } from '../pages/employee/components/EmployeeDetail';

const AppRoutes = [
    { path: "/", element: <Dashboard /> , title:"Dashboard"  },
    { path: "/listproject", element: <ListProject/>, title:"List Project" },
    { path: "/listemployee", element: <EmployeeDetail/>, title: "List Employees" },

]

export default AppRoutes;
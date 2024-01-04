import { createBrowserRouter } from "react-router-dom"
import EmployeeDetail from "../pages/employee/components/EmployeeDetail.jsx";
import ShowEmployees from "../pages/employee/EmployeeManagement.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ShowEmployees />,
        errorElement: <div>Not found</div>,
    },
    {
        path: "/employee/:id",
        element: <EmployeeDetail />,
        // errorElement: <div>Not found</div>,
    },
    {
        path: "/login",
        // element: <Login />,
    },
]);

export default router;

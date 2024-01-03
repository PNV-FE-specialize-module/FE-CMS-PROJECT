import { createBrowserRouter } from "react-router-dom";
import AddEmployee from "../pages/employee/components/AddEmployeeInf";

const router = createBrowserRouter([
    {
        path: "/add",
        element: <AddEmployee/>,
    },
]);

export default router;
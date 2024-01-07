import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addEmployeeApi,
    deleteEmployeeApi,
    getDetailEmployee, getManager,
    updateEmployeeApi
} from "../api/EmployeeApi.js";
import {useNavigate} from "react-router";

export const useGetDetailEmployee = (id) => {
    return useQuery({
        queryKey: ["EMPLOYEE", id],
        queryFn: async () => {
            try {
                const { data } = await getDetailEmployee(id);
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        }
    });
};
export const useCreateEmployee = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(
        (newEmployee) => addEmployeeApi(newEmployee),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["EMPLOYEE"]);
                navigate("/listemployee")

            },

        },
    );

    return mutation;
};

export const useUpdateEmployee = (id) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (params) => updateEmployeeApi(id, params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('employee');
            },
        }
    );

    return mutation;
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    const deleteEmployee = async (employeeId) => {
        await deleteEmployeeApi(employeeId);
    };
    return useMutation(deleteEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries("employee");
        },
    });
};
export const useGetManager = () =>
    useQuery(["EMPLOYEE"], async () => {
        const { data } = await getManager();
        return data;
    });

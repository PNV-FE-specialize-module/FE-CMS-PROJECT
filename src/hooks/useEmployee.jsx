import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteEmployeeApi, getDetailEmployee, updateEmployeeApi} from "../api/EmployeeApi.js";

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
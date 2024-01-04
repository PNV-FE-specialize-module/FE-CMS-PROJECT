import { useQuery } from "@tanstack/react-query";
import { getDetailEmployee } from "../api/EmployeeApi.js";


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

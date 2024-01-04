import { useQuery } from "@tanstack/react-query";
import { getprojects } from "../api/Project";

export const useGetProject = () => {
    return useQuery({
        queryKey: ["PROJECT"],
        queryFn: async () => {
            try {
                const { data } = await getprojects();
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        }
    });
};
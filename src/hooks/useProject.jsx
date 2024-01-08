import { useQuery } from "@tanstack/react-query";
import { getDetailProject, getprojects } from "../api/Project";
import {getTotalEmployee} from "../api/EmployeeApi.js";
import {getTotalProject} from "../api/ProjectApi.js";

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

export const useGetDetaiProject = (id) => {
    return useQuery({
        queryKey: ["PROJECT", id],
        queryFn: async () => {
            try {
                const { data } = await getDetailProject(id);
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        }
    });
};

export const useGetProjectTotal = (params) =>
    useQuery(["PROJECT_TOTAL", params.period], async () => {
        const { data } = await getTotalProject(params);
        return data;
    });




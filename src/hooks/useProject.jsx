<<<<<<< HEAD
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getDetailProject, getprojects, updateProjectApi } from "../api/Project";
=======
import { useQuery } from "@tanstack/react-query";
import { getDetailProject, getprojects } from "../api/Project";
import {getTotalEmployee} from "../api/EmployeeApi.js";
>>>>>>> fcdca14c8e498142894b79afbdad336bf06167bf

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

<<<<<<< HEAD
export const useUpdateProject = (id) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (params) => updateProjectApi(id, params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('project');
            },
        }
    );

    return mutation;
};
=======
>>>>>>> fcdca14c8e498142894b79afbdad336bf06167bf


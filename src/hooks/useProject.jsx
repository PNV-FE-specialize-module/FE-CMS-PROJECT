import { useQuery } from "@tanstack/react-query";
import { getDetailProject, getprojects } from "../api/Project";
import { getTotalEmployee } from "../api/EmployeeApi.js";

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
// export const useGetDeleteProject = (id) => {
//     return useQuery({
//         queryKey:["PROJECT", id],
//         queryFn: async () => {
//             try {
//                 const { data } = await getDeleteProject (id);
//                 return data;
//             } catch (error) {
//                 console.error("Error:".error);
//                 throw error;
//             }
//         }
//     });
// };
export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    const deleteProject = async (projectId) => {
        await deleteProjectApi(projectId);
    };
    return useMutation(deleteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("project");
        },
    });
};

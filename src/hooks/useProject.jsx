import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getDetailProject, getProjects, updateProjectApi } from "../api/Project";
import { useTranslation} from 'react-i18next';

// import {getTotalEmployee} from "../api/EmployeeApi.js";


export const useGetProject = (params) => {
    const { t, i18n } = useTranslation();
    return useQuery({
        queryKey: [t("main.Project"),  params.search, params.status],
        queryFn: async () => {
            try {
                const { data } = await getProjects(params);
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        }
    });
};

  

export const useGetDetaiProject = (id) => {
    const { t, i18n } = useTranslation();
    return useQuery({
        queryKey: [t("main.Project"), id],
        queryFn: async () => {
            try {
                const { data } = await getDetailProject(id);
                return data;
            } catch (error) {
                console.error(t("main.Error:"), error);
                throw error;
            }
        }
    });
};

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


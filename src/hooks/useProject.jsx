import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getDetailProject, getprojects, updateProjectApi,getProjectApi,getProjectStatus,patchStatusApi, } from "../api/Project";
import { useTranslation} from 'react-i18next';
import { deleteProjectApi,  } from "../api/ProjectApi";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// import {getTotalEmployee} from "../api/EmployeeApi.js";

export const useGetProject = () => {
    const { t, i18n } = useTranslation();
    return useQuery({
        queryKey: [t("main.Project")],
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
export const useGetData = (params) => {
    const { t, i18n } = useTranslation();
    return useQuery({
      queryKey: ['projects',params.status],
      queryFn: async () => {
        try {
          const { data } = await getProjectApi(params);
          return data;
        } catch (error) {
          throw error;
        }
      },
    });
  };
  export const useProjectStatusUpdate = () => {
    const queryClient = useQueryClient();
    const projectStatusUpdate = async ({ projectId, status }) => {
      await patchStatusApi(projectId, status);
    };
    return useMutation(projectStatusUpdate, {
      onMutate: async ({ projectId, status }) => {
        queryClient.setQueryData(['projects', status], (prevData) => {
          return prevData;
        });
        return { projectId, status }; 
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['projects', 'desiredStatus']);
        queryClient.refetchQueries('projects')
      },
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

export const useDeleteProject = () => {
    const navigate = useNavigate()
    const deleteProject= async (employeeId) => await deleteProjectApi(employeeId)
    return useMutation(deleteProject, {
        onSuccess: (data) => {
            console.log(data);
            const check = data.data.message=='Employee deletion successful'

            if(check){
                Swal.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false
                });
                navigate('/listproject');
            }
            else{
                Swal.fire({
                    title: 'Error',
                    text: data.data.message,
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false
                }) 
            }
        },
    });
}


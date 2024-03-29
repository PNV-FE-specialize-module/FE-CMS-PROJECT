import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useTranslation} from 'react-i18next';
import { deleteProjectApi,  } from "../api/ProjectApi";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { getTotalProject, postAddProject } from "../api/ProjectApi.js";
import {
  getDetailProject,
  getProjects,
  updateProjectApi,
  getProjectApi,
  patchStatusApi,
} from "../api/ProjectApi";


export const useGetProject = (params) => {
    return useQuery({
        queryKey: ["PROJECT",  params.search, params.status],
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
export const useGetData = (params) => {
  return useQuery({
    queryKey: ["projects", params.status],
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

export const useAddProject = () => {
  const { t, i18n } = useTranslation();

  const queryClient = useQueryClient();
  const addProject = async (newProject) => await postAddProject(newProject);
  const mutation = useMutation(addProject, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["PROJECT"]);
      await queryClient.refetchQueries();
      Swal.fire({
        icon: "success",
        title: t("main.Success"),
        text: t("main.Employee updated successfully!"),
      });
    },
  });

  return mutation;
};

export const useProjectStatusUpdate = () => {
  const queryClient = useQueryClient();
  const projectStatusUpdate = async ({ projectId, status }) => {
    await patchStatusApi(projectId, status);
  };
  return useMutation(projectStatusUpdate, {
    onMutate: async ({ projectId, status }) => {
      queryClient.setQueryData(["projects", status], (prevData) => {
        return prevData;
      });
      return { projectId, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", "desiredStatus"]);
      queryClient.refetchQueries("projects");
    },
  });
};

  

export const useGetDetaiProject = (id) => {
    return useQuery({
        queryKey: ['PROJECT_DETAIL', id],
        queryFn: async () => {
            try {
                const { data } = await getDetailProject(id);
                return data;
            } catch (error) {
                throw error;
            }
        }
    });
};

export const useUpdateProject = (id) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((params) => updateProjectApi(id, params), {
    onSuccess: () => {
      queryClient.invalidateQueries("PROJECT");
    },
  });

  return mutation;
};
export const useGetProjectTotal = (params) =>
  useQuery(["PROJECT_TOTAL", params.period], async () => {
    const { data } = await getTotalProject(params);
    return data;
  });

export const useDeleteProject = () => {
  const navigate = useNavigate();
  const deleteProject = async (employeeId) =>
    await deleteProjectApi(employeeId);
  return useMutation(deleteProject, {
    onSuccess: (data) => {
      const check = data.data.message == "Employee deletion successful";

      if (check) {
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/listproject");
      } else {
        Swal.fire({
          title: "Error",
          text: data.data.message,
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
  });
};

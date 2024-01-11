import baseAxios from "./baseAxios";

const ENDPOINT = "project"

export const getProjects = async (params) => {
    return await baseAxios.get(`${ENDPOINT}`, { params } );
}

export const getDetailProject = async (id, params = {}) => {
  return await baseAxios.get(`${ENDPOINT}/${id}`, params);
};
export const getProjectApi = (params) => baseAxios.get(`${ENDPOINT}`,  params );

export const getProjectStatus = (params) => baseAxios.get(`${ENDPOINT}`,  params );

export const patchStatusApi = (projectId, status) =>
  baseAxios.patch(`${ENDPOINT}/${projectId}`, { status });

export const updateProjectApi =  async (projectId, params ={}) => {
  return await baseAxios.patch(`${ENDPOINT}/${projectId}`, {...params})
}

export default {
  getProjects,
  getDetailProject,
  updateProjectApi
}
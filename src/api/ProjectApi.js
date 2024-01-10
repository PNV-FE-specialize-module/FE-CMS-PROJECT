import baseAxios from "./baseAxios";

const ENDPOINT = "project"

export const getprojects = async () => {
    return await baseAxios.get(`${ENDPOINT}`);
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
export const postAddProject = async (params = {}) => {
  return await baseAxios.post(`${ENDPOINT}`, params);
};
export const getTotalProject = async (params) =>{
  return await baseAxios.get(`${ENDPOINT}/total`, {params})
}
export const deleteProjectApi =  async (projectId) => await baseAxios.delete(`${ENDPOINT}/${projectId}`)

export default {
  getprojects,
  getDetailProject,
  updateProjectApi,
  postAddProject,
  getTotalProject,
  deleteProjectApi
}
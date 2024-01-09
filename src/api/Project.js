import baseAxios from "./baseAxios";

const ENDPOINT = "project"

export const getprojects = async () => {
    return await baseAxios.get(`${ENDPOINT}`);
}

export const getDetailProject = async (id, params = {}) => {
  return await baseAxios.get(`${ENDPOINT}/${id}`, params);
};

export const updateProjectApi =  async (projectId, params ={}) => {
  return await baseAxios.patch(`${ENDPOINT}/${projectId}`, {...params})
}

export default {
  getprojects,
  getDetailProject,
  updateProjectApi
}
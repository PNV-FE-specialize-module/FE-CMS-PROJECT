import baseAxios from "./baseAxios";

const ENDPOINT = "project"

export const getprojects = async () => {
    return await baseAxios.get(`${ENDPOINT}`);
}

export const getDetailProject = async (id, params = {}) => {
  return await baseAxios.get(`${ENDPOINT}/${id}`, params);
};

export const deleteProjectApi =  async (projectId) => {
  return await baseAxios.delete(`${ENDPOINT}/${projectId}`)
}


export default {
  getprojects,
  getDetailProject
}
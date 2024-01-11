import baseAxios from "./baseAxios";

const ENDPOINT = "assign";

export const postAssignApi = async (params = {}) => {
    return await baseAxios.post(`${ENDPOINT}`, params);
}

export const unAssignAPI = async (params) => {
    return await baseAxios.delete(`${ENDPOINT}`, { data: params });
}

export const updateAssign =  async (assignId, params ={}) => {
    return await baseAxios.patch(`${ENDPOINT}/${assignId}`, {...params})
  }

export default {
    postAssignApi,
    unAssignAPI,
    updateAssign
}
import baseAxios from "./baseAxios";

const ENDPOINT = "assign";

export const postAssignApi = async (params = {}) => {
    return await baseAxios.post(`${ENDPOINT}`, params);
}


export default {
    postAssignApi
}
import baseAxios from "./baseAxios.js";

const ENDPOINT="project";


export const postAddProject = async (params = {}) => {
    return await baseAxios.post(`${ENDPOINT}`, params);
};
export const getTotalProject = async () =>{
    return await baseAxios.get(`${ENDPOINT}/total`)
}

export default {
    postAddProject,
    getTotalProject
}
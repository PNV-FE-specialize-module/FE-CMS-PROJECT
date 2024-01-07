import baseAxios from "./baseAxios.js";

const ENDPOINT="project";


export const postAddProject = async (params = {}) => {
    console.log(11,params);
    console.log(12,`${ENDPOINT}`, params);
    return await baseAxios.post(`${ENDPOINT}`, params);
};
export const getTotalProject = async () =>{
    return await baseAxios.get(`${ENDPOINT}/total`)
}

export default {
    postAddProject,
    getTotalProject
}
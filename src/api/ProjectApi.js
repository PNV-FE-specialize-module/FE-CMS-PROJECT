import baseAxios from "./baseAxios.js";

const ENDPOINT="project";


export const postAddProject = async (params = {}) => {
    return await baseAxios.post(`${ENDPOINT}`, params);
};

export default {
    postAddProject
}

import baseAxios from "./baseAxios.js";

const ENDPOINT="employee";


export const getDetailEmployee = async (id, params = {}) => {
    return await baseAxios.get(`${ENDPOINT}/${id}`, params);
};

export default {
    getDetailEmployee
}

import baseAxios from "./baseAxios.js";

const ENDPOINT="employee";


export const getDetailEmployee = async () => {
    return await baseAxios.get(`${ENDPOINT}`);
};
export const addEmployeeApi = async (params) => {
    return await baseAxios.post(`${ENDPOINT}`, params);
};

export const updateEmployeeApi =  async (employId, params ={}) => {
    return await baseAxios.patch(`${ENDPOINT}/${employId}`, {...params})
}
export const deleteEmployeeApi =  async (employId) => {
    return await baseAxios.delete(`${ENDPOINT}/${employId}`)
}

export const getManager = async () => {
    return await baseAxios.get(`${ENDPOINT}/managers`);
}

export default {
    getDetailEmployee,
    updateEmployeeApi,
    deleteEmployeeApi,
    addEmployeeApi,
    getManager

}
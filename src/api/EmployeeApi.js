
import baseAxios from "./baseAxios.js";

const ENDPOINT="employee";


export const getDetailEmployee = async (id, params = {}) => {
    return await baseAxios.get(`${ENDPOINT}/${id}`, params);
};

export const updateEmployeeApi =  async (employId, params ={}) => {
    return await baseAxios.patch(`${ENDPOINT}/${employId}`, {...params})
}
export const deleteEmployeeApi =  async (employId) => {
    return await baseAxios.delete(`${ENDPOINT}/${employId}`)
}
export default {
    getDetailEmployee,
    updateEmployeeApi,
    deleteEmployeeApi
}
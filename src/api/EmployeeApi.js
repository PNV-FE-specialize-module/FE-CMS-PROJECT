
import baseAxios from "./baseAxios.js";

const ENDPOINT="employee";


export const getDetailEmployee = async () => {
    return await baseAxios.get(`${ENDPOINT}`);
};

export default {
    getDetailEmployee
}
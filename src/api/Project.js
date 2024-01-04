import baseAxios from "./baseAxios";

const ENDPOINT = "project"

export const getprojects = async () => {
    return await baseAxios.get(`${ENDPOINT}`);
}


export default {
  getprojects
}
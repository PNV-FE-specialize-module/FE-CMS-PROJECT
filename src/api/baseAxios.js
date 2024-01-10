import axios from 'axios';

const baseAxios = axios.create({
    baseURL: 'https://nineams-diyv.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default baseAxios;
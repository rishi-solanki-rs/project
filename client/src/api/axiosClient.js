import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://project-backend-o3bh.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;


import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://project-backend1-23ny.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;


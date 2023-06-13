import axios from "axios";

export const instance = (apiUrl) => axios.create({
    withCredentials: 'include',
    baseURL: apiUrl,
})

export const formInstance =(apiUrl)=> axios.create({
    headers: {
        "Content-type": "multipart/form-data",
    },
    withCredentials: 'include',
    baseURL: apiUrl,
})

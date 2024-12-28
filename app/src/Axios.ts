
import axios from "axios";


export const AuthCall = axios.create({
    baseURL: 'http://localhost:3030/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
})

const getBearer = () => {
    // Verifico che sto girando sul client
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
}

export const ApiCall = axios.create({
    baseURL: 'http://localhost:3030/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getBearer()
    },
})


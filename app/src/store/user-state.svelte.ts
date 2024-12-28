
import axios from 'axios';
import { AuthCall } from '../Axios';

interface UserState {
    id: string,
    name?: string,
    email: string,
    auth: boolean
}

export const userState : UserState = $state({
    name: "",
    email: "",
    id: "",
    auth: false,
});


export async function login(email: string, password: string) {
    
    const response =  await AuthCall.post('/login', {'email': email, 'password': password});

    let data = response.data.data;
    

    if (data) {
        userState.id = data.id;
        userState.name = data.name;
        userState.email = data.email;
        
        userState.auth = true;
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userState));
    }

};  
    

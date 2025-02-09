import axios from 'axios';

const API_KEY ='AIzaSyAUaEewiFMbqsIjSdf7-CAFbrlUiCsl9EU'

 async function authentcation(mode,email,password){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, {
        email:email,
        password:password,
        returnSecureToken:true
    });
    const token = response.data.idToken;
    
    return token;    
}

export  function createUser(email,password){
    return authentcation('signUp',email,password);
}

export  function login(email,password) {
    return authentcation('signInWithPassword',email,password)
}

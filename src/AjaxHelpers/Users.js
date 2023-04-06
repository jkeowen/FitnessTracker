const axios = require('axios');

const registerNewUser = (firstName, lastName, username, password, age, weight, emailAddress) =>{
  axios.post('/api/users/register',{
    firstName, lastName, username, password, age, weight, emailAddress, isActive:true
  })
  .then((response)=>{
    console.log(response.data);
    if(response.data.success) window.localStorage.setItem("token", response.data.token);
  })
  .catch(console.err);
}

export const userLogin = (username, password) =>{
  axios.post('api/users/login',{
    username, password
  })
  .then((response)=>{
    console.log(response.data);
    if(response.data.success) window.localStorage.setItem('token', response.data.token);
  })
}

export const getCurrentUser = (username, setter) =>{
  axios.get('api/users/me',{
    username
  })
  .then((response) =>{
    console.log(response.data);
    setter(response.data.user);
  })
}


export default registerNewUser;
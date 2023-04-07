const axios = require('axios');


const registerNewUser = (firstName, lastName, username, password, age, weight, emailAddress, setLoginOut, navigator, errorSetter) =>{
  fetch('/api/users/register',{
    method:"POST",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      password,
      age,
      weight,
      emailAddress,
      isActive: true
    })
  }).then(response => response.json())
    .then(result =>{
      errorSetter('')
      if(result.success){
        setLoginOut('Logout');
        window.localStorage.setItem('token', result.token);
        window.localStorage.setItem('username', username);
        navigator('/dashboard');
    }
    else if(result.error) errorSetter(result.error);
    else errorSetter('Registration Error!')
    }).catch(console.error);
}

// const registerNewUser = (firstName, lastName, username, password, age, weight, emailAddress) =>{
//   axios.post('/api/users/register',{
//     firstName, lastName, username, password, age, weight, emailAddress, isActive:true
//   })
//   .then((response)=>{
//     console.log(response.data);
//     if(response.data.success) window.localStorage.setItem("token", response.data.token);
//   })
//   .catch(console.err);
// }

export const userLogin = async(username, password, setLoginOut, navigator, errorSetter) =>{
  fetch('/api/users/login',{
    method:"POST",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(response => response.json())
    .then(result =>{
      if(result.success){
        window.localStorage.setItem('token', result.token);
        window.localStorage.setItem('username', username);
        setLoginOut('Logout')
        navigator('/')
      }
      else errorSetter('Invalid credentials')
    }).catch(console.error);
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
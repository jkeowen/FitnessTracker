const axios = require('axios');


const fetchAllRoutines = (setter) =>{
  axios.get('/api/Routines')
  .then((response)=>{
    setter(response.data.routines)
  })
}

export default fetchAllRoutines;
const axios = require('axios');


const fetchAllRoutines = (setter) =>{
  axios.get('/api/Routines')
  .then((response)=>{
    setter(response.data.routines)
  })
}

export const createNewRoutine = (creator_id, name, description, typeId, isPublic, isActive, setter, currentValues, activityNames) =>{
  axios.post('/api/Routines',{
    creator_id, name, description, typeId, isPublic, isActive
  })
  .then((response)=>{ 
    response.data.routine.activities = activityNames
    if(response.data.success) setter([...currentValues, response.data.routine])
  })
}

export default fetchAllRoutines;
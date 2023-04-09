const axios = require('axios');


const fetchAllRoutines = (setter) =>{
  axios.get('/api/Routines')
  .then((response)=>{
    setter(response.data.routines)
  })
}

export const createNewRoutine = (creator_id, name, description, typeId, isPublic, isActive, setter, currentValues, activityNames, activitiesCount, username) =>{
  axios.post('/api/Routines',{
    creator_id, name, description, typeId, isPublic, isActive
  })
  .then((response)=>{ 
    response.data.routine.activities = [];
    for(let i = 0; i < activityNames.length; i++){
      const medObject = {};
      medObject[activityNames[i]] = activitiesCount[i];
      response.data.routine.activities.push(medObject)
    }
    response.data.routine.creator = username;
    if(response.data.success) setter([...currentValues, response.data.routine])
  })
}

export default fetchAllRoutines;
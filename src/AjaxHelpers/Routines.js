
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

export const editRoutine = (id, name, description, setter ) =>{
  fetch(`api/Routines/${id}`,{
    method:'PATCH',
    headers:{
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      name,
      description
    })
  }).then(response => response.json())
    .then(result =>{
      console.log(result)
    }).catch(console.error)
}

export const deleteRoutine = (routineId, currentValues, setter) =>{
  fetch(`api/Routines/${routineId}`,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(result => {
     setter(currentValues.filter((value)=> value.id !== routineId))
    }).catch(console.error);
}

export default fetchAllRoutines;
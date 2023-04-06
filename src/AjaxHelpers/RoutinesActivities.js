const axios = require('axios');

const makeActivityRoutinesRelation = (routineId, activityId) =>{
  axios.post('/api/routinesActivities',{
    routineId, activityId
  })
  .then((response) =>{
    return response.data
  })
}

export default makeActivityRoutinesRelation;
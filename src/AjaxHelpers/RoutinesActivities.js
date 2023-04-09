const axios = require('axios');

const makeActivityRoutinesRelation = (routineId, activityId, count) =>{
  axios.post('/api/routinesActivities',{
    routineId, activityId, count
  })
  .then((response) =>{
    return response.data
  })
}

export default makeActivityRoutinesRelation;
const axios = require('axios');

const fetchAllActivities = async(setter) =>{
  try{
  const response = await fetch(`/api/activities/`);
  const result = await response.json();
  setter(result.activities);
  }
  catch(err){
    throw err
  }
};

export const createNewActivity = (name, id, instructions, reps, sets, equipment, type_id, desciption, setter, currentValues) =>{
  axios.post('/api/activities',{
    name, id, instructions, reps, sets, equipment, type_id, desciption
  })
  .then((response)=>{
    if(response.data.success) setter([...currentValues, response.data.newActivity])
  })
}

export default fetchAllActivities;
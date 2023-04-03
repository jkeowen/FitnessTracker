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

export const createNewActivity = (name, instructions, reps, sets, equipment, type_id, desciption, setter, currentValues) =>{
  axios.post('/api/activities',{
    name, instructions, reps, sets, equipment, type_id, desciption
  })
  .then((response)=>{
    console.log(currentValues)
    console.log(response.data.newActivity)
    if(response.data.success) setter([...currentValues, response.data.newActivity])
  })
}

export default fetchAllActivities;
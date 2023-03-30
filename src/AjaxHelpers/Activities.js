
const fetchAllActivities = async(setter) =>{
  try{
  const response = await fetch(`/api/activities/`);
  const result = await response.json();
  console.log(result.success);
  setter(result.activities);
  // return result.activities;
  }
  catch(err){
    throw err
  }
}

export default fetchAllActivities;

const fetchAllActivities = async(setter) =>{
  try{
  const response = await fetch(`/api/activities/`);
  const result = await response.json();
  setter(result.activities);
  }
  catch(err){
    throw err
  }
}

export default fetchAllActivities;
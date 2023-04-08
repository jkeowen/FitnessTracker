
const getSingleUserRecords = (userId, setter) =>{
  fetch(`/api/personalrecords/users/${userId}`,{
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
    .then(result =>{
      console.log(result)
    setter(result.record)
  }).catch(console.error)
}

export default getSingleUserRecords;
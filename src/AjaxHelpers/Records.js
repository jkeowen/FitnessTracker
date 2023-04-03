const axios =  require('axios');
const fetchAllRecords = (setter) => {
  axios.get('/api/personalRecords')
  .then((response)=>{
    setter(response.data.records);
  })
} 

export default fetchAllRecords;
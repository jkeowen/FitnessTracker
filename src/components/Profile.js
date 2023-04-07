import React, {useState, useEffect} from 'react';
import { getCurrentUser } from '../AjaxHelpers/Users';
import Table from 'react-bootstrap/Table';
const Profile = () =>{

  const [ userData, setUserData ] = useState({activities:[], routines:[]});
  useEffect(()=>{
    if(window.localStorage.getItem('username')){
    getCurrentUser(window.localStorage.getItem('username'), setUserData )
    }
  }, [])
  return(
    <div id='user-profile' className= 'p-4'>
      <Table striped bordered hover className='w-25'  > 
        <thead className='text-center'>Hello, {userData.username}!
        <tr>
          <td>Name: </td>
          <td>{userData.first_name} {userData.last_name}</td>
        </tr>
        </thead>
        {
          Object.keys(userData).map((key, index)=> {
            return(
              <tbody>
                {
                  key !== 'id' && key !== 'is_active' && key !== 'activities' &&
                  key !== 'routines' && key !== 'first_name' && key !== 'last_name' ? 
                  <tr  >
                    <td>{key}:</td>
                    <td>{Object.values(userData)[index]} </td>
                  </tr> : null
                }
              </tbody>
            )
          })
        }
      </Table>
      <div>
        <div>
      <h3>Current Activities</h3>
      <ul>
        {
          userData.activities.map((personalSelected, index)=>{
            return(
              <li key={index}>{personalSelected}</li>
            )
          })
        }
      </ul>
      </div>
      </div>
    </div>
    )
}

export default Profile;
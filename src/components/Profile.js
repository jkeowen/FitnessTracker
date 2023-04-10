import React, {useState, useEffect} from 'react';
import { getCurrentUser } from '../AjaxHelpers/Users';
import fetchAllRoutines from '../AjaxHelpers/Routines';
import  getSingleUserRecords from '../AjaxHelpers/PersonalRecords' 
import Table from 'react-bootstrap/Table';
const Profile = () =>{

  const [ userData, setUserData ] = useState({activities:[], routines:[]});
  const [ records, setRecords ] = useState([]);
  const [ routines, setRoutines ] = useState([]);
  useEffect(()=>{
    if(window.localStorage.getItem('username')){
    getCurrentUser(setUserData );
    }
    fetchAllRoutines(setRoutines);
  }, [])

  useEffect(()=>{
    getSingleUserRecords(userData.id, setRecords)
  },[userData])
  return(
    <div id='user-profile' className= 'p-4'>
      <Table striped bordered hover className='w-25'  > 
        <thead>
          <tr className='text-center' >
            <td colSpan={2} >Hello, {userData.username}!</td>
            </tr>
        <tr>
          <td>Name: </td>
          <td>{userData.first_name} {userData.last_name}</td>
        </tr>
        </thead>
        {
          Object.keys(userData).map((key, index)=> {
            return(
              <tbody key={index}>
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
          userData.activities.map((activity, index)=>{
            return(
              <li key={index}>{activity}</li>
            )
          })
        }
      </ul>
      </div>
      <div>
      <h3>Current Participated in Routines</h3>
      <ul>

        {
          userData.routines.map((routine, index)=>{
            return(
              <li key={index}>{routine}</li>
            )
          })
        }
      </ul>
      </div>
      <div>
      <h3>Your Created Routines</h3>
      <ul>
        {
          routines.filter((routine)=> routine.id === userData.id).map((routine, index)=>{
            return(
              <li key={index}>{routine.name}</li>
            )
          })
        }
      </ul>
      </div>
      {
        records ? 
        <Table bordered className='w-25' >
          <thead><tr>
            <td colSpan={2} className='text-center'>Your Current Records</td>
            </tr>
            </thead>
          <tbody>
            {
              records.map((record, index)=>{
                return(
                  <tr key={index}>
                    <td>{record.activity}</td>
                    {record.record[record.record.length -1] ==='s'?
                    <td>{record.record}</td> :
                    <td>{record.record}lb</td>                      
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </Table> : null
          }
      </div>
      {

      }
    </div>
    
    )
}

export default Profile;
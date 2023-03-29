import React, {useState, useEffect} from "react";
import fetchAllActivities from "../AjaxHelpers/Activities";

const InfoBox = () =>{

  const [ allActivites, setAllActivities ] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    fetchAllActivities(setAllActivities);
  },[])
  console.log(allActivites);

  return(
    <div id="info-box" className="h-50">
      <div className="lavander-bg rounded">
        <div className="border border-dark rounded">
          <span>Activities</span>
          <span>Routines</span>
          <span>Records</span>
        </div>
        <form>
          <input placeholder="search"/>
        </form>
        {
          allActivites.map((activity, index)=>{
            return(
              <div key={index} className="border border-dark rounded">
                <div className="d-flex flex-row">
                  <div>
                    <h3 className="border-bottom">{activity.name}</h3>
                    <p>{activity.descritpion}</p>
                  </div>
                  <div>
                    <h5>{activity.type}</h5>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default InfoBox;
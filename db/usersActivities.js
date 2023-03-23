const client = require('./client');

const addActivityToUser = async(userId, activityId) =>{
	try{
		const { rows : [ assignment ] } = await client.query(`
				INSERT INTO users_activities(user_id, activity_id)
				VALUES($1,$2)
				RETURNING *;
		`, [userId, activityId]);
		return assignment
}catch(err){
		throw err
	}
}

module.exports = {
  addActivityToUser,
  
}
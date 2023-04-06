const client = require('./client');
const { getUsernames } = require('./users');

const createActivity = async(name, creatorId, instructions, reps, sets, equipment, type_id, description) =>{
	try{
	const { rows: [ activity ] } = await client.query(`
			INSERT INTO activities(name, creator_id, instructions, reps, sets, equipment, type_id, description)
			VALUES($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING *;
	`, [name, creatorId, instructions, reps, sets, equipment, type_id, description]);
	const { rows: [typeData] } = await client.query(`
			SELECT name, icon  
			FROM exercise_type
			WHERE exercise_type.id = $1;
	`, [type_id]);
		activity.type = typeData.name;
		activity.icon = typeData.icon;
		return activity
	}catch(err){
			throw err;
	};
};

const getActivities = async() => {
	try{
		const {rows: activities} = await client.query(`
			SELECT activities.id, activities.name, creator_id, exercise_type.name as type, exercise_type.icon as icon, instructions, reps, sets, equipment, description FROM activities
			JOIN exercise_type
			ON activities.type_id = exercise_type.id;
	`);
		const usernames = await getUsernames();
	activities.forEach((activity)=>{
		activity.creator = null;
		if( activity.creator_id > 0 )
			activity.creator = usernames[activity.creator_id -1].username;
	})
	return activities;
	}catch(err){
			throw err
	}
};

const getSingleActivity = async(activityId) =>{
	try{
		const { rows: [activity] } = await client.query(`
			SELECT * FROM activities
			JOIN exercise_type
			ON activities.type_id = exercise_type.id
			WHERE activities.id = $1;
			`, [activityId])
			return activity;
	}catch(err){
			throw err;
	}
	};

module.exports = {
  createActivity,
  getActivities, 
  getSingleActivity,
}
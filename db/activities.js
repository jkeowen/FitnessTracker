const client = require('./client');

const createActivity = async(name, instructions, reps, sets, equipment, type_id, description) =>{
	try{
	const { rows: [ activity ] } = await client.query(`
			INSERT INTO activities(name, instructions, reps, sets, equipment, type_id, description)
			VALUES($1, $2, $3, $4, $5, $6, $7)
			RETURNING *;
	`, [name, instructions, reps, sets, equipment, type_id, description]);
			return activity
	}catch(err){
			throw err;
	};
};

const getActivities = async() => {
	try{
		const {rows: activities} = await client.query(`
			SELECT * FROM activities
			JOIN exercise_type
			ON activities.type_id = exercise_type.id;
	`)
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

// const getActivityByRoutine = async(activityId) => {
// 	try {
// 		const {rows: [activity]} = await client.query(`
// 		SELECT activities.name
// 		FROM activities
// 		JOIN routines_activites 
// 		ON activities.id = routines_activities.id_activities 
// 		WHERE routines_activities.id_routines = $1;
// 		`, [activityId])

// 	}
// }

module.exports = {
  createActivity,
  getActivities, 
  getSingleActivity,
}
const client = require('./client');

const assignActivityToRoutine = async(routine_id, activity_id) => {
	try{
	const { rows :[ assignemnt ] } = await client.query(`
			INSERT INTO routines_activities(id_routines, id_activities)
			VALUES($1, $2)
			RETURNING *;
	`, [routine_id, activity_id]);
			return assignemnt
	}catch(err){
			throw err;
	}
};

module.exports = {
  assignActivityToRoutine,
  
}
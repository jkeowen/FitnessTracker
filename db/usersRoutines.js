const client = require('./client');

const addRoutineToUser = async(userId, routineId) => {
	try{
		const {rows : [assignment] } = await client.query(`
			INSERT INTO users_routines(user_id, routine_id)
			VALUES($1,$2)
			RETURNING *;
		`, [userId, routineId]);
		return assignment
	}catch (err){
		throw err
	}
}

module.exports = {
  addRoutineToUser
}
const client = require('./client');

const createExerciseType = async(name, icon) =>{
	try{
			const { rows : [ type ]} = await client.query(`
					INSERT INTO exercise_type(name, icon)
					VALUES($1, $2)
					RETURNING *;
			`, [name, icon]);
			return type;
	}catch(err){
			throw err;
	}
}

const getExerciseType = async() =>{
	try{
		const { rows: type } = await client.query(`
				SELECT * FROM exercise_type;
		`)
		return type
	}catch(err){
			throw err
	}
}

const getSingleExerciseType = async(typeId) =>{
	try{
		const { rows: type } = await client.query(`
		SELECT * FROM exercise_type
		WHERE id = $1;
	`, [typeId])
			return type
	}catch(err){
			throw err
	}
}

module.exports = {
  createExerciseType,
  getExerciseType,
  getSingleExerciseType,
  
}
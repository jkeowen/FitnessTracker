const client = require('./client');

const createExerciseType = async(name) =>{
	try{
			const { rows : [ type ]} = await client.query(`
					INSERT INTO exercise_type(name)
					VALUES($1)
					RETURNING *;
			`, [name]);
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
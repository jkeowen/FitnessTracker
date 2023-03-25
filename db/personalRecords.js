const client = require('./client');

const getRecordsByActivity = async(activityId) => {
	try{
		const { rows: records } = await client.query(`
		SELECT *
		FROM personal_records 
		JOIN users 
		ON personal_records.user_id = users.id
		JOIN activities
		ON personal_records.activity_id = activities.id
		WHERE activity_id = $1;
		`, [activityId]);
			return records;
	} catch (err) {
			throw err;
	}
};

const addPersonalRecord = async(userId, activityId, record) =>{
	try{
		const { rows : [ personalRecord ] } = await client.query(`
				INSERT INTO personal_records(user_id, activity_id, record)
				VALUES($1, $2, $3)
				RETURNING *;
		`, [userId, activityId, record])
		return personalRecord;
	}catch(err){
			throw err;
	}
};

const getSingleUserRecords = async(userId) => {
	try{
		const { rows: singleUserRecords } = await client.query(`
		SELECT users.first_name, users.last_name, activities.name as activity, record 
		FROM personal_records 
		JOIN users 
		ON personal_records.user_id = users.id
		JOIN activities
		ON personal_records.activity_id = activities.id
				WHERE user_id = $1;
		`, [userId]);
		return singleUserRecords;
	} catch (err){
		throw err;
}
};

const getPersonalRecords = async() => {
	try{
		const { rows: personalRecords } = await client.query(`
				SELECT users.first_name, users.last_name, activities.name as activity, record 
				FROM personal_records 
				JOIN users 
				ON personal_records.user_id = users.id
				JOIN activities
				ON personal_records.activity_id = activities.id;
		`)
		return personalRecords;
	} catch (err){
			throw err;
	}
};



module.exports = {
  getRecordsByActivity,
  addPersonalRecord,
	getSingleUserRecords,
	getPersonalRecords
}
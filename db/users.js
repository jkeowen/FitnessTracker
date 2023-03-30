const client = require('./client');
const bcrypt = require('bcrypt');


const getUsers = async() =>{
	try{
	const { rows : users} = await client.query(`
			SELECT * FROM users;
	`);
		const { rows : activitiesRelations } = await client.query(`
			SELECT activities.name,  users_activities.user_id
			FROM activities
			JOIN users_activities
			ON activities.id = users_activities.activity_id;
		`);
		const { rows: routineRelations } = await client.query(`
			SELECT routines.name, users_routines.user_id
			FROM routines
			JOIN users_routines
			ON routines.id = users_routines.routine_id;
		`);
		users.forEach((user)=>{
			delete user.password;
			user.activities = [];
			user.routines = [];
			for(let i = 0; i < activitiesRelations.length; i++){
					if(activitiesRelations[i]. user_id === user.id){
							user.activities.push(activitiesRelations[i].name);
					}
			}for (let i = 0; i < routineRelations.length; i++){
				if(routineRelations[i].user_id === user.id) {
					user.routines.push(routineRelations[i].name)
				}
			}
		})
		return users
	}catch(err){
			throw err;
	}
}


const getAndVerifyUserByUsername = async(username, password) =>{
	if(!username, !password) return false;
	try{
		const { rows : [user] } = await client.query(`
			SELECT * 
			FROM users
			WHERE username = $1; 
		`, [username]);
		if(!user) return false;
		console.log(password)
		const matchPassword = await bcrypt.compare(password, user.password);
		if(!matchPassword) {return false;}
		delete user.password;
		const { rows : activitiesRelations } = await client.query(`
				SELECT activities.name
				FROM activities
				JOIN users_activities
				ON activities.id = users_activities.activity_id
				WHERE users_activities.user_id = ${user.id};
		`)
			const { rows : routinesRelations } = await client.query(`
				SELECT routines.name
				FROM routines
				JOIN users_routines
				ON routines.id = users_routines.routine_id
				WHERE users_routines.user_id = ${user.id};
		`,);
		user.activities = activitiesRelations.map((relation)=> relation.name);
		user.routines = routinesRelations.map((relation)=> relation.name);
		return user;
	}catch(err){
		throw err;
	}
}

const getUserByUsername = async( username ) =>{
	try{
		const { rows : [user] } = await client.query(`
			SELECT * FROM users 
			WHERE username = $1;
		`, [username]);
		return user;
	}catch(err){
		throw err;
	}
}

const deleteUser = async (userId) => {
	try{
		const { rows: removed } = await client.query(`
		UPDATE users
		SET is_active = false
		WHERE id = $1
		RETURNING *;
		`, [userId])
		return removed
	} catch (err) {
		throw err;
	}
};

const editUser = async(userID, fields={})=>{
	const setString = Object.keys(fields).map((key, index)=>`${key}=$${index + 2}`).join(', ');
	try{
		const { rows: [ updated ] } = await client.query(`
			UPDATE users
			SET ${setString}
			WHERE id = $1
			RETURNING*;
		`,[userID, ...Object.values(fields)]);
		return updated;
	}catch(err){
		throw err
	}
};

const createUser = async(firstName, lastName, username, password, age, weight, emailAddress, isActive) =>{
	try{
		const _user = await getUserByUsername(username);
		if(_user) return false;
	const encryptedPassword =  await bcrypt.hash(password, 5);
	const { rows: [ user ] } = await client.query(`
			INSERT INTO users(first_name, last_name, username, password, age, weight, email_address, is_active)
			VALUES('${firstName}', '${lastName}', '${username}', '${encryptedPassword}', '${age}', '${weight}', '${emailAddress}', '${isActive}')
			RETURNING id, first_name, last_name, username, age, weight, email_address, is_active;
	`);
	return user;
	}catch(err){
			throw err
	}
};



module.exports = {
  createUser,
  getUsers,
	getUserByUsername,
	deleteUser,
	editUser, 
	getAndVerifyUserByUsername

}
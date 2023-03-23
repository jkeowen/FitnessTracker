const client = require('./client');

const createUser = async(firstName, lastName, username, password, age, weight, emailAddress, isActive) =>{
	try{
	const { rows: [ user ] } = await client.query(`
			INSERT INTO users(first_name, last_name, username, password, age, weight, email_address, is_active)
			VALUES($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING *;
	`, [firstName, lastName, username, password, age, weight, emailAddress, isActive]);
	return user;
	}catch(err){
			throw err
	}
};

const getUsers = async() =>{
	try{
	const { rows : users} = await client.query(`
			SELECT * FROM users;
	`);
		const { rows : relations } = await client.query(`
			SELECT activities.name,  users_activities.user_id
			FROM activities
			JOIN users_activities
			ON activities.id = users_activities.activity_id;
		`);
		const { rows: routineRelations } = await client.query(`
			SELECT routines.name, users_routines.user_id
			FROM routines
			JOIN users_routines
			ON routines.id = users_activities.activity_id;
		`);
		users.forEach((user)=>{
			delete user.password;
			user.activities = [];
			for(let i = 0; i < relations.length; i++){
					if(relations[i]. user_id === user.id){
							user.activities.push(relations[i].name);
					}
			}for (let j = 0; i < routineRelations.length; i++){
				if(routineRelations[j].user_id === user.Id) {
					user.routines.push(routineRelations[j].name)
				}
			}
		})
		return users
	}catch(err){
			throw err;
	}
}

const getSingleUser = async(userId) => {
	try{
		const { rows: [user] } = await client.query(`
				SELECT * FROM users 
				WHERE users.id = $1;
		`,[userId]);
				const { rows : relations } = await client.query(`
				SELECT activities.name
				FROM activities
				JOIN users_activities
				ON activities.id = users_activities.activity_id
				WHERE users_activities.user_id = $1;
		`, [userId])

		user.activities = relations.map((relation)=> relation.name);
console.log(user)
;		return user;
}catch(err){
		throw err;
	}
};



module.exports = {
  createUser,
  getUsers,
  getSingleUser,
}
Routes:
•	/users
    o	Get all users: GET: /users
    o	Register new user: POST: /users/register
    o	Login existing user: POST: /users/login
    o	Get current user profile: GET: /users/me
    o	Get other user profile: GET: /users/:username

•	/personal_records
    o	Get Personal Records Leader Board: GET: /personal_records
    o	Get single user records: GET: /personal_records/:username
    o	Create a new user record: PATCH: /personal_records/:username
    o	Create a custom record: POST: /personal_records
    o	*Delete a users records: DELETE: /personal_records/:username
•	/activities
    o	Get all activities: GET: /activities
    o	Create new activity: POST: /activities
    o	*Edit activity: PATCH: /activities/:activityId
    o	Get an activity: GET: /activities/:activityId 
    o	Get routines by activity: GET: /activities/:activityId/routines
•	/routines
    o	Get all routines: GET: /routines
    o	Create a  new routine: POST: /routines
    o	*Edit user routine: PATCH: /routines/:routineId
    o	Delete user routine: DELETE: /routines/:routineId
    o	Get routine by user creator: GET: /routines/:username
    o	Add an activity to a routine: POST: /routines/:routineId/activities
•	/exercise_type
    o	Get all exercise types: GET: /exercise_type
    o	Get a single exercise type: GET: /exercise_type/:id
    •	/routines_activities
    o	Create new relation: POST: /routines_activities 
    o	*DELETE relation: DELETE: /routines_activities/:routines_activitiesId
•	/users_activities 

----3/22/23-----
    X Make more seed data
    -Make server functions 
        -Go for some easy early wins!:
            X Get activities and single
            X Get personal records all and by user
            X Get exercise types and single type
        -Do slightly harder functions:
            X Get users, current user, other(add activities to them)
            X Get Routines
            -All Posts, Patch, Delete 
                -Seems like four functions as most posts are already made
        -Login/Register
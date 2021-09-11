const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import Userfriend from './type/Userfriend';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function getUserfriendById(userfriend: Userfriend) {

    try {
//checking userfriend exist or not
//**************************************************************************************
        //creating query
        let query = await data.query(
            //get specific table's coloumn from database
            `
                SELECT idExistInUsersTable FROM userfriendsOfUserID_${userfriend.idFrom}
            `
        );


        let flag = false;
        //for each value of column iterate
        for(let {idExistInUsersTable} of query.records) {
            if(idExistInUsersTable == userfriend.idTo) {
                flag = true;
                break;
            }
        }


        //if not exist
        if(!flag) {
            console.log('ERROR', "sorry!, this friend not exist");
            return null;
        }
//**************************************************************************************


        //creating query
        let query2 = await data.query(
            //get table's specific id row from database
            `
                SELECT * FROM users
                WHERE id=${userfriend.idTo}
            `
        );


        return query2.records[0];
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getUserfriendById;
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


async function deleteUserfriend(userfriend: Userfriend) {

    try {
//deleting userfriend for one-end user
//**************************************************************************************
        //creating query
        let query = await data.query(
            //delete table's row from database
            `
                DELETE FROM userfriendsOfUserID_${userfriend.idFrom}
                WHERE idExistInUsersTable=${userfriend.idTo}
            `
        );
//**************************************************************************************


//deleting userfriend for other-end user
//**************************************************************************************
        //creating query
        let query2 = await data.query(
            //delete table's row from database
            `
                DELETE FROM userfriendsOfUserID_${userfriend.idTo}
                WHERE idExistInUsersTable=${userfriend.idFrom}
            `
        );
//**************************************************************************************


        return userfriend;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteUserfriend;
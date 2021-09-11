const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import Restaurantuser from './type/Restaurantuser';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function getRestaurantuserById(restaurantuser: Restaurantuser) {

    try {
//checking restaurantuser exist or not
//**************************************************************************************
        //creating query
        let query = await data.query(
            //get specific table's coloumn from database
            `
                SELECT idExistInUsersTable FROM restaurantusersOfRestaurantID_${restaurantuser.idFrom}
            `
        );


        let flag = false;
        //for each value of column iterate
        for(let {idExistInUsersTable} of query.records) {
            if(idExistInUsersTable == restaurantuser.idTo) {
                flag = true;
                break;
            }
        }


        //if not exist
        if(!flag) {
            console.log('ERROR', "sorry!, this user not exist");
            return null;
        }
//**************************************************************************************


        //creating query
        let query2 = await data.query(
            //get table's specific id row from database
            `
                SELECT * FROM users
                WHERE id=${restaurantuser.idTo}
            `
        );
        

        return query2.records[0];
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getRestaurantuserById;
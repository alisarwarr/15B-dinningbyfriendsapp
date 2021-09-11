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


async function deleteRestaurantuser(restaurantuser: Restaurantuser) {

    try {
//deleting restaurantuser for one-end restaurant
//**************************************************************************************
        //creating query
        let query = await data.query(
            //delete table's row from database
            `
                DELETE FROM restaurantusersOfRestaurantID_${restaurantuser.idFrom}
                WHERE idExistInUsersTable=${restaurantuser.idTo}
            `
        );
//**************************************************************************************


//deleting userrestaurant for other-end user
//**************************************************************************************
        //creating query
        let query2 = await data.query(
            //delete table's row from database
            `
                DELETE FROM userrestaurantsOfUserID_${restaurantuser.idTo}
                WHERE idExistInRestaurantsTable=${restaurantuser.idFrom}
            `
        );
//**************************************************************************************


        return restaurantuser;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteRestaurantuser;
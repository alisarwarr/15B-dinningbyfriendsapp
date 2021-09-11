const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import Userrestaurant from './type/Userrestaurant';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function deleteUserrestaurant(userrestaurant: Userrestaurant) {

    try {
//deleting userrestaurant for one-end user
//**************************************************************************************
        //creating query
        let query = await data.query(
            //delete table's row from database
            `
                DELETE FROM userrestaurantsOfUserID_${userrestaurant.idFrom}
                WHERE idExistInRestaurantsTable=${userrestaurant.idTo}
            `
        );
//**************************************************************************************


//deleting restaurantuser for other-end restaurant
//**************************************************************************************
        //creating query
        let query2 = await data.query(
            //delete table's row from database
            `
                DELETE FROM restaurantusersOfRestaurantID_${userrestaurant.idTo}
                WHERE idExistInUsersTable=${userrestaurant.idFrom}
            `
        );
//**************************************************************************************


        return userrestaurant;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteUserrestaurant;
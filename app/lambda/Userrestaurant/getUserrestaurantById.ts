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


async function getUserrestaurantById(userrestaurant: Userrestaurant) {

    try {
//checking userrestaurant exist or not
//**************************************************************************************
        //creating query
        let query = await data.query(
            //get specific table's coloumn from database
            `
                SELECT idExistInRestaurantsTable FROM userrestaurantsOfUserID_${userrestaurant.idFrom}
            `
        );


        let flag = false;
        //for each value of column iterate
        for(let {idExistInRestaurantsTable} of query.records) {
            if(idExistInRestaurantsTable == userrestaurant.idTo) {
                flag = true;
                break;
            }
        }


        //if not exist
        if(!flag) {
            console.log('ERROR', "sorry!, this restaurant not exist");
            return null;
        }
//**************************************************************************************


        //creating query
        let query2 = await data.query(
            //get table's specific id row from database
            `
                SELECT * FROM restaurants
                WHERE id=${userrestaurant.idTo}
            `
        );


        return query2.records[0];
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getUserrestaurantById;
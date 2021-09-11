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


async function createUserrestaurant(userrestaurant: Userrestaurant) {

    try {
//creating userrestaurant for one-end user
//**************************************************************************************
        //creating query
        let query = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS userrestaurantsOfUserID_${userrestaurant.idFrom} (
                    id INT NOT NULL AUTO_INCREMENT,
                    idExistInRestaurantsTable INT NOT NULL,
                    PRIMARY KEY (id)
                )
            `
        );

        //creating query
        query = await data.query(
            //inserting data into a table
            `
                INSERT INTO userrestaurantsOfUserID_${userrestaurant.idFrom}
                (idExistInRestaurantsTable)
                VALUES
                (${userrestaurant.idTo})
            `
        );
//**************************************************************************************


//creating restaurantuser for other-end restaurant
//**************************************************************************************
        //creating query
        let query2 = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS restaurantusersOfRestaurantID_${userrestaurant.idTo} (
                    id INT NOT NULL AUTO_INCREMENT,
                    idExistInUsersTable INT NOT NULL,
                    PRIMARY KEY (id)
                )
            `
        );

        //creating query
        query2 = await data.query(
            //inserting data into a table
            `
                INSERT INTO restaurantusersOfRestaurantID_${userrestaurant.idTo}
                (idExistInUsersTable)
                VALUES
                (${userrestaurant.idFrom})
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

export default createUserrestaurant;

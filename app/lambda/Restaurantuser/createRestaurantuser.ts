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


async function createRestaurantuser(restaurantuser: Restaurantuser) {

    try {
//creating restaurantuser for one-end restaurant
//**************************************************************************************
        //creating query
        let query = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS restaurantusersOfRestaurantID_${restaurantuser.idFrom} (
                    id INT NOT NULL AUTO_INCREMENT,
                    idExistInUsersTable INT NOT NULL,
                    PRIMARY KEY (id)
                )
            `
        );        

        //creating query
        query = await data.query(
            //inserting data into a table
            `
                INSERT INTO restaurantusersOfRestaurantID_${restaurantuser.idFrom}
                (idExistInUsersTable)
                VALUES
                (${restaurantuser.idTo})
            `
        );
//**************************************************************************************


//creating userrestaurant for other-end user
//**************************************************************************************
        //creating query
        let query2 = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS userrestaurantsOfUserID_${restaurantuser.idTo} (
                    id INT NOT NULL AUTO_INCREMENT,
                    idExistInRestaurantsTable INT NOT NULL,
                    PRIMARY KEY (id)
                )
            `
        );

        //creating query
        query2 = await data.query(
            //inserting data into a table
            `
                INSERT INTO userrestaurantsOfUserID_${restaurantuser.idTo}
                (idExistInRestaurantsTable)
                VALUES
                (${restaurantuser.idFrom})
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

export default createRestaurantuser;
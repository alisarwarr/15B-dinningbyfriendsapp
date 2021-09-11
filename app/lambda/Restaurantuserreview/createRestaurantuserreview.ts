const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import Restaurantuserreview from './type/Restaurantuserreview';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function createRestaurantuserreview(restaurantuserreview: Restaurantuserreview) {

    try {
        //creating query
        let query = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS restaurantuserreviewsOfRestaurantID_${restaurantuserreview.idFrom} (
                    r_id INT NOT NULL AUTO_INCREMENT,
                    r_restaurantId_ExistInRestaurantsTable INT NOT NULL,
                    r_userId_ExistInUsersTable INT NOT NULL,
                    r_userName_ExistInUsersTable TEXT NOT NULL,
                    r_text TEXT NOT NULL,
                    PRIMARY KEY (r_id)
                )
            `
        );


        //creating query
        query = await data.query(
            //inserting data into a table
            `
                INSERT INTO restaurantuserreviewsOfRestaurantID_${restaurantuserreview.idFrom}
                (r_restaurantId_ExistInRestaurantsTable, r_userId_ExistInUsersTable, r_userName_ExistInUsersTable, r_text)
                VALUES
                (${restaurantuserreview.idFrom}, ${restaurantuserreview.idTo}, '${restaurantuserreview.hisName}', '${restaurantuserreview.text}')
            `
        );
    

        return restaurantuserreview;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createRestaurantuserreview;
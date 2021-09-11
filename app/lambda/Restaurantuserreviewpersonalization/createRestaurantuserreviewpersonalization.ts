const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import Restaurantuserreviewpersonalization from './type/Restaurantuserreviewpersonalization';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function createRestaurantuserreviewpersonalization(restaurantuserreviewpersonalization: Restaurantuserreviewpersonalization) {

    try {
        //creating query
        let query = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS restaurantuserreviewpersonalizationsOfRestaurantID_${restaurantuserreviewpersonalization.idFrom} (
                    p_id INT NOT NULL AUTO_INCREMENT,
                    p_reviewId_ExistInReviewsTable INT NOT NULL,
                    p_userId_ExistInUsersTable INT NOT NULL,
                    p_userName_ExistInUsersTable TEXT NOT NULL,
                    p_useful BOOLEAN NOT NULL,
                    PRIMARY KEY (p_id)
                )
            `
        );


        //creating query
        query = await data.query(
            //inserting data into a table
            `
                INSERT INTO restaurantuserreviewpersonalizationsOfRestaurantID_${restaurantuserreviewpersonalization.idFrom}
                (p_reviewId_ExistInReviewsTable, p_userId_ExistInUsersTable, p_userName_ExistInUsersTable, p_useful)
                VALUES
                (${restaurantuserreviewpersonalization.idTo}, ${restaurantuserreviewpersonalization.hisId}, '${restaurantuserreviewpersonalization.hisName}', ${restaurantuserreviewpersonalization.useful})
            `
        );

 
        return restaurantuserreviewpersonalization;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createRestaurantuserreviewpersonalization;
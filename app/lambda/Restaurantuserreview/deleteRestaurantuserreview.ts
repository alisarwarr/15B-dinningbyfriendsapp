const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function deleteRestaurantuserreview(restaurantuserreview) {

    try {
        //creating query
        let query = await data.query(
            //delete table's row from database
            `
                DELETE FROM restaurantuserreviewsOfRestaurantID_${restaurantuserreview.idFrom}
                WHERE r_userId_ExistInUsersTable=${restaurantuserreview.idTo}
            `
        );

        return restaurantuserreview;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteRestaurantuserreview;
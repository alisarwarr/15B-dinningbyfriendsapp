const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function editRestaurantuserreviewpersonalization(restaurantuserreviewpersonalization) {

    try {
        //creating query
        let query = await data.query(
            //update table's row in database
            `
                UPDATE restaurantuserreviewpersonalizationsOfRestaurantID_${restaurantuserreviewpersonalization.idFrom}
                SET p_useful=${restaurantuserreviewpersonalization.useful}
                WHERE p_reviewId_ExistInReviewsTable=${restaurantuserreviewpersonalization.idTo} AND p_userId_ExistInUsersTable=${restaurantuserreviewpersonalization.hisId}
            `
        );
     
        return restaurantuserreviewpersonalization;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default editRestaurantuserreviewpersonalization;
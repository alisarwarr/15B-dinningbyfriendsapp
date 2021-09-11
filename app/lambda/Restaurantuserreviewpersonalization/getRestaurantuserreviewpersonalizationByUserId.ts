const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function getRestaurantuserreviewpersonalizationByUserId(restaurantuserreviewpersonalization) {

    try {
        //creating query
        let query = await data.query(
            //get specific id table's row from database
            `
                SELECT * FROM restaurantuserreviewpersonalizationsOfRestaurantID_${restaurantuserreviewpersonalization.idFrom}
                WHERE p_reviewId_ExistInReviewsTable=${restaurantuserreviewpersonalization.idTo} AND p_userId_ExistInUsersTable=${restaurantuserreviewpersonalization.hisId}
            `
        );


        return query.records[0];
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getRestaurantuserreviewpersonalizationByUserId;
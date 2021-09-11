const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import allRestaurantuserreviews from '../Restaurantuserreview/allRestaurantuserreviews';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function handler(id: string) {
    return await allRestaurantuserreviews(id);
}


async function all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId(args) {
//******************************************************************************************************************************
    var _allRestaurantuserreviews = await handler(args.id);
//******************************************************************************************************************************



    try {
        let query = await data.query(
            //checking table exist or not at database
            `
                SHOW TABLES LIKE 'restaurantuserreviewsOfRestaurantID_${args.id}'
            `
        );
        //if left table not exist at database
        if((query.records).length === 0) {
            /* ( incase of no reviews exist ) */
            return [];
        }



        query = await data.query(
            //checking table exist or not at database
            `
                SHOW TABLES LIKE 'restaurantuserreviewpersonalizationsOfRestaurantID_${args.id}'
            `
        );
        //if right table not exist at database
        if((query.records).length === 0) {
            /* ( incase of reviews exist but no personalizations exist ) */
            return _allRestaurantuserreviews;
        }



//https://stackoverflow.com/questions/4752455/left-join-with-where-clause
//******************************************************************************************************************************
        let query2 = await data.query(
            //get specific two table's coloumns using ( LEFT JOIN ) using WHERE clause from database
            `
                SELECT * FROM
                restaurantuserreviewsOfRestaurantID_${args.id}
                LEFT JOIN
                restaurantuserreviewpersonalizationsOfRestaurantID_${args.id}
                ON
                restaurantuserreviewsOfRestaurantID_${args.id}.r_id=restaurantuserreviewpersonalizationsOfRestaurantID_${args.id}.p_reviewId_ExistInReviewsTable
                WHERE
                restaurantuserreviewpersonalizationsOfRestaurantID_${args.id}.p_userId_ExistInUsersTable=${args.hisId}
            `
        );
        /* ( fetched only his reviews with personlizations ) */
        var _all_Restaurantuserreviews_RestaurantuserreviewpersonalizationsByUserId = query2.records;
//******************************************************************************************************************************



//******************************************************************************************************************************
        /* check one by one for every review */
        for(var obj of _allRestaurantuserreviews) {

            const result = _all_Restaurantuserreviews_RestaurantuserreviewpersonalizationsByUserId
                         /* check that any ( personalization review id ) is same as ( review id ) or not */
                           .filter(({ p_reviewId_ExistInReviewsTable } ) => p_reviewId_ExistInReviewsTable === obj.r_id)[0];


            /* if same then replace ( review ) with ( review with personlizations ) */
            if(result !== undefined) {
                /* remove that particular ( review ) */
                _allRestaurantuserreviews = _allRestaurantuserreviews
                                            .filter(({ r_id }) => r_id !== obj.r_id);

                /* add that particular ( review with personalization ) */
                _allRestaurantuserreviews.push(result);
            }
        }
        
        /* sort because remove from random index & add in last index */
        _allRestaurantuserreviews.sort((a, b) => a.r_id - b.r_id);
//******************************************************************************************************************************



        return _allRestaurantuserreviews;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId;
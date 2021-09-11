const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import getRestaurantuserreviewByUserId from '../Restaurantuserreview/getRestaurantuserreviewByUserId';
import getRestaurantuserreviewpersonalizationByUserId from '../Restaurantuserreviewpersonalization/getRestaurantuserreviewpersonalizationByUserId';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function handler1({ idFrom, idTo }) {
    return await getRestaurantuserreviewByUserId({ idFrom, idTo });
}
async function handler2({ idFrom, idTo, hisId }) {
    return await getRestaurantuserreviewpersonalizationByUserId({ idFrom, idTo, hisId });
}


async function all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(args) {

    try {
//grapping userreview for each restaurant
//**************************************************************************************
        //creating query
        let query = await data.query(
            //get table's all rows id from database
            `
                SELECT id FROM restaurants
            `
        );
//**************************************************************************************



        let modifiedData = Array();
        //for each value of column iterate
        for(let {id: _id} of query.records) {
            let query2 = await data.query(
                //checking table exist or not at database
                `
                    SHOW TABLES LIKE 'restaurantuserreviewsOfRestaurantID_${_id}'
                `
            );
            //if left table exist at database
            if((query2.records).length !== 0) {
                //******************************************************************************************************************************
                /* grap review of that user in particular restaurant */
                var _getRestaurantuserreviewByUserId = await handler1({ idFrom: _id, idTo: args.id });
                //******************************************************************************************************************************



                let query3 = await data.query(
                    //checking table exist or not at database
                    `
                        SHOW TABLES LIKE 'restaurantuserreviewpersonalizationsOfRestaurantID_${_id}'
                    `
                );
                //if right table exist at database
                if((query3.records).length !== 0) {
                    //******************************************************************************************************************************
                    /* grap review personalization of that user in particular restaurant */
                    var _getRestaurantuserreviewpersonalizationByUserId = await handler2({ idFrom: _id, idTo: _getRestaurantuserreviewByUserId.r_id, hisId: args.hisId });
                    //******************************************************************************************************************************



                    if(
                        _getRestaurantuserreviewByUserId !== undefined
                     && _getRestaurantuserreviewpersonalizationByUserId === undefined
                    ) {
                        //pushing each id's row data to array 
                        modifiedData.push(_getRestaurantuserreviewByUserId);
                    }
                    else if(
                        _getRestaurantuserreviewByUserId !== undefined
                     && _getRestaurantuserreviewpersonalizationByUserId !== undefined
                    ) {
                        //pushing each id's row data to array 
                        modifiedData.push({
                            ..._getRestaurantuserreviewByUserId,
                            ..._getRestaurantuserreviewpersonalizationByUserId
                        });
                    }
                }
                else {
                    if(
                        _getRestaurantuserreviewByUserId !== undefined
                    ) {
                        //pushing each id's row data to array 
                        modifiedData.push(_getRestaurantuserreviewByUserId);
                    }
                }
            }
        }



        return modifiedData;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId;
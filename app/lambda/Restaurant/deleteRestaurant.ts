const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


import deleteUserrestaurant from '../Userrestaurant/deleteUserrestaurant';


async function handler({ idFrom, idTo }) {
    return await deleteUserrestaurant({ idFrom, idTo });
}


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function deleteRestaurant(id: string) {

    try {
//******************************************************************************************************************************
    //**************************************************************************************************************************
        //creating query
        let query = await data.query(
            //delete table's row from database
            `
                DELETE FROM restaurants
                WHERE id=${id}
            `
        );
    //**************************************************************************************************************************



    //**************************************************************************************************************************
        //creating query
        let query2 = await data.query(
            //get table's all rows id from database
            `
                SELECT id FROM users
            `
        );

        for(let {id: _id} of query2.records) {
            /* deleting particular user as a 'Userrestaurant' from all user */
            var _deleteUserrestaurant = await handler({ idFrom: _id, idTo: id });
        }
    //**************************************************************************************************************************



    //**************************************************************************************************************************
        //creating query
        let query3 = await data.query(
            //create table from database
            /* deleting 'Restaurantuser' table for particular restaurant */
            `
                DROP TABLE IF EXISTS restaurantusersOfRestaurantID_${id}
            `
        );
    //**************************************************************************************************************************



    //**************************************************************************************************************************
        //creating query
        let query4 = await data.query(
            //create table from database
            /* deleting 'Restaurantuserreview' table for particular restaurant */
            `
                DROP TABLE IF EXISTS restaurantuserreviewsOfRestaurantID_${id}
            `
        );
    //**************************************************************************************************************************



    //**************************************************************************************************************************
        //creating query
        let query5 = await data.query(
            //create table from database
            /* deleting 'Restaurantuserreviewpersonalization' table for particular restaurant */
            `
                DROP TABLE IF EXISTS restaurantuserreviewpersonalizationsOfRestaurantID_${id}
            `
        );
    //**************************************************************************************************************************



        return id;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteRestaurant;
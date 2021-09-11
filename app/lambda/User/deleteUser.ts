const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


import deleteUserfriend from '../Userfriend/deleteUserfriend';
import deleteRestaurantuser from '../Restaurantuser/deleteRestaurantuser';
import deleteRestaurantuserreview from '../Restaurantuserreview/deleteRestaurantuserreview';
import deleteRestaurantuserreviewpersonalization from '../Restaurantuserreviewpersonalization/deleteRestaurantuserreviewpersonalization';


async function handler1({ idFrom, idTo }) {
    return await deleteUserfriend({ idFrom, idTo });
}
async function handler2({ idFrom, idTo }) {
    return await deleteRestaurantuser({ idFrom, idTo });
}
async function handler3({ idFrom, idTo }) {
    return await deleteRestaurantuserreview({ idFrom, idTo });
}
async function handler4({ idFrom, idTo, hisId }) {
    return await deleteRestaurantuserreviewpersonalization({ idFrom, idTo, hisId });
}


//COGNITO
const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function deleteUser(user) {
    try {
        //deleting user from cognito
        let result = await cognitoidentityserviceprovider.adminDeleteUser({
            UserPoolId: process.env.USERPOOL_ID || '',
            Username: user.name
        }).promise();



//******************************************************************************************************************************
    //**************************************************************************************************************************
        //creating query
        let query = await data.query(
            //delete table's row from database
            `
                DELETE FROM users
                WHERE id=${user.id}
            `
        );
    //**************************************************************************************************************************



    //**************************************************************************************************************************
        //creating query
        let query2 = await data.query(
            //create table from database
            /* deleting 'Userfriend' table for particular user */
            `
                DROP TABLE IF EXISTS userfriendsOfUserID_${user.id}
            `
        );

    //**************************************************************************************************************************
 
    

    //**************************************************************************************************************************
        //creating query
        let query3 = await data.query(
            //create table from database
            /* deleting 'Userrestaurant' table for particular user */
            `
                DROP TABLE IF EXISTS userrestaurantsOfUserID_${user.id}
            `
        );
    //**************************************************************************************************************************



    //**************************************************************************************************************************
        //creating query
        let query4 = await data.query(
            //get table's all rows id from database
            `
                SELECT id FROM users
            `
        );

        for(let {id: _id} of query4.records) {
            /* deleting particular user as a 'Userfriend' from all user */
            var _deleteUserfriend = await handler1({ idFrom: _id, idTo: user.id });
        }
    //**************************************************************************************************************************


        
    //**************************************************************************************************************************
        //creating query
        let query5 = await data.query(
            //get table's all rows id from database
            `
                SELECT id FROM restaurants
            `
        );

        for(let {id: __id} of query5.records) {
            /* deleting particular user as a 'Restaurantuser' from all restaurant */
            var _deleteRestaurantuser = await handler2({ idFrom: __id, idTo: user.id });

            /* deleting particular user as a 'Restaurantuserreview' from all restaurant */
            var _deleteRestaurantuserreview = await handler3({ idFrom: __id, idTo: user.id });
        }
    //**************************************************************************************************************************
    


    //**************************************************************************************************************************
        for(var i in query5.records) {
            for(var j in query4.records) {
                /* deleting particular user as a 'Restaurantuserreviewpersonalization' from all restaurant */
                var _deleteRestaurantuserreviewpersonalization = await handler4({ idFrom: i, idTo: j, hisId: user.id });
            }
        }
    //**************************************************************************************************************************
//******************************************************************************************************************************



        return user;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteUser;
const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import Userfriend from './type/Userfriend';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function createUserfriend(userfriend: Userfriend) {

    try {
//creating userfriend for one-end user
//**************************************************************************************
        //creating query
        let query = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS userfriendsOfUserID_${userfriend.idFrom} (
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
                INSERT INTO userfriendsOfUserID_${userfriend.idFrom}
                (idExistInUsersTable)
                VALUES
                (${userfriend.idTo})
            `
        );
//**************************************************************************************


//creating userfriend for other-end user
//**************************************************************************************
        //creating query
        let query2 = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS userfriendsOfUserID_${userfriend.idTo} (
                    id INT NOT NULL AUTO_INCREMENT,
                    idExistInUsersTable INT NOT NULL,
                    PRIMARY KEY (id)
                )
            `
        );

        //creating query
        query2 = await data.query(
            //inserting data into a table
            `
                INSERT INTO userfriendsOfUserID_${userfriend.idTo}
                (idExistInUsersTable)
                VALUES
                (${userfriend.idFrom})
            `
        );
//**************************************************************************************


        return userfriend;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createUserfriend;
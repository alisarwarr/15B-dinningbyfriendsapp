const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function allUserrestaurants(id: string) {

    try {
        let query = await data.query(
            //checking table exist or not at database
            `
                SHOW TABLES LIKE 'userrestaurantsOfUserID_${id}'
            `
        );
        //if table not exist at database
        if((query.records).length === 0) {
            return [];
        }


        //creating query
        query = await data.query(
            //get specific table's coloumn from database
            `
                SELECT idExistInRestaurantsTable FROM userrestaurantsOfUserID_${id}
            `
        );


        let modifiedData = Array();
        //for each value of column iterate
        for(let {idExistInRestaurantsTable} of query.records) {
            //creating query
            let query2 = await data.query(
                //get specific id table's row from database
                `
                    SELECT * FROM restaurants
                    WHERE id=${idExistInRestaurantsTable}
                `
            );
        
            const record = query2.records[0];
            //if restaurant exist and not deleted from table in past
            if(record !== undefined) {
                //pushing each id's row data to array 
                modifiedData.push(record);
            }
        }


        return modifiedData;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default allUserrestaurants;
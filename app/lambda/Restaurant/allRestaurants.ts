const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function allRestaurants() {

    try {
        let query = await data.query(
            //checking table exist or not at database
            `
                SHOW TABLES LIKE 'restaurants'
            `
        );
        //if table not exist at database
        if((query.records).length === 0) {
            return [];
        }


        //creating query
        query = await data.query(
            //get table's all rows from database
            `
                SELECT * FROM restaurants
            `
        );


        return query.records;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default allRestaurants;
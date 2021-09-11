const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function getUserByName(name: string) {

    try {
        //creating query
        let query = await data.query(
            //get specific name table's row from database
            `
                SELECT * FROM users
                WHERE name='${name}'
            `
        );

        return query.records[0];
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getUserByName;

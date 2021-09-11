const dbcarn = process.env.CLUSTER_ARN || '';
const dbsarn = process.env.SECRET_ARN || '';
const dbname = process.env.DATABASE_NAME || '';
import Restaurant from './type/Restaurant';


//require and initialize data-api-client
const data = require('data-api-client')({
  secretArn: dbsarn,
  resourceArn: dbcarn,
  database: dbname
});


async function createRestaurant(restaurant: Restaurant) {

    try {
        //creating query
        let query = await data.query(
            //create table into database
            `
                CREATE TABLE IF NOT EXISTS restaurants (
                    id INT NOT NULL AUTO_INCREMENT,
                    name TEXT NOT NULL,
                    cuisine TEXT NOT NULL,
                    address TEXT NOT NULL,
                    PRIMARY KEY (id)
                )
            `
        );


        //creating query
        query = await data.query(
            //inserting data into a table
            `
                INSERT INTO restaurants
                (name, cuisine, address)
                VALUES
                ('${restaurant.name}', '${restaurant.cuisine}', '${restaurant.address}')
            `
        );
        
        
        return restaurant;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createRestaurant;
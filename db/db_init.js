// (Re)Sets up the database, including a little bit of sample data
const db = require("./db_connection");

/**** Delete existing table, if any ****/

const drop_things_table_sql = "DROP TABLE IF EXISTS `things`;"

db.execute(drop_things_table_sql);

/**** Create "stuff" table (again)  ****/

const create_things_table_sql = `
    CREATE TABLE things (
        id INT NOT NULL AUTO_INCREMENT,
        item VARCHAR(45) NOT NULL,
        quantity INT NOT NULL,
        description VARCHAR(150) NULL,
        PRIMARY KEY (id)
    );
`
db.execute(create_things_table_sql);

/**** Create some sample items ****/

const insert_things_table_sql = `
    INSERT INTO things 
        (item, quantity, description) 
    VALUES 
        (?, ?, ?);
`
db.execute(insert_things_table_sql, ['Plumbuses', '-6', 'In order to make the common household item known as a plumbus, you first have to cut the dinglebop. Next, you smooth out the dinglebop with a bunch of shleem, which eventually gets repurposed for later batches. You then must take the dinglebop and push it through the krumbo. Once it has crossed over to the other side of the krumbo, you must rub a fleeb against it to create fleeb juice. The next step, and this is crucial, is that a shlami shows up and rubs the dinglebop and then spits on it. Finally, the ploobus and krumbo are shaved away, and boom, you have a plumbus.']);

db.execute(insert_things_table_sql, ['Splorguses', '87446', null]);

db.execute(insert_things_table_sql, ['Thingamajig', '12345', 'Not to be confused with a Thingamabob']);

db.execute(insert_things_table_sql, ['Thingamabob', '54321', 'Not to be confused with a Thingamajig']);

/**** Read the sample items inserted ****/

const read_stuff_table_sql = "SELECT * FROM stuff";

db.execute(read_stuff_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'stuff' initialized with:")
        console.log(results);
    }
);

db.end();
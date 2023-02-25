const express = require( "express" );
const logger = require("morgan");
const db = require("./db/db_connection");
const app = express();
const port = 8080;

app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

app.use(logger("dev"));

app.use(express.static(__dirname + '/public'));

app.get( "/", ( req, res ) => {
    res.render('index');
});

const read_things_all_sql = `
    SELECT 
        id, item, quantity
    FROM
        things
`

app.get( "/things", ( req, res ) => {
    db.execute(read_things_all_sql, (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results);
        }
    })
} );

const read_item_sql = `
    SELECT 
        item, quantity, description 
    FROM
        things
    WHERE
        id = ?
`

app.get( "/things/item/:id", ( req, res ) => {
    db.execute(read_item_sql, [req.params.id], (error, results) => {
        if (error) 
            res.status(500).send(error);
        else if (results.length == 0)
            res.status(404).send(`No item found with id = "${req.params.id}"` );
        else {
            let data = results[0];
            res.render('item', data);
        }
    });
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );    
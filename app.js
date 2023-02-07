//set up the server
const express = require( "express" );
const logger = require("morgan");
const app = express();
const port = 8080;

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the things inventory page
app.get( "/things", ( req, res ) => {
    db.execute('SELECT id, item, quantity FROM things', (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results);
        }
    })
} );

// define a route for the item detail page
app.get( "/things/item", ( req, res ) => {
    db.execute('SELECT id, item, quantity FROM things WHERE id = 0', (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results[0]);
        }
    })
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );
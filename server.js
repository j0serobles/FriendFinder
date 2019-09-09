
// Dependencies
//=============================================================
var path    = require( 'path' ); 
var express = require( 'express' );

// file system module to perform file operations
const fs = require('fs');

var htmlRoutes = require ('./app/routing/htmlRoutes.js')
var apiRoutes = require ('./app/routing/apiRoutes.js')


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
//==============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', htmlRoutes); 
app.use('/api', apiRoutes); 


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  




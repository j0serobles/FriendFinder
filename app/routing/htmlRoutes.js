var express = require('express'); 
var path    = require ('path'); 

var router  = express.Router(); 

//Middleware that is specific to htmlRoutes
// router.use ( function timelog ( req, res, next) {
//     console.log('Time : ' , Date.now()); 
//     next(); 
// });

//Define the home page route
router.get ('/', function ( req, res ) {

    res.sendFile(path.join(__dirname, '../public/home.html'));

}); 

//Define the survey page route
router.get ('/survey', function ( req, res) {

   res.sendFile(path.join(__dirname, '../public/survey.html')); 

}); 

module.exports = router; 

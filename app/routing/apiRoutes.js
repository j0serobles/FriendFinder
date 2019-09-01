var express = require('express'); 
var path    = require ('path'); 

var router  = express.Router(); 

//Middleware that is specific to htmlRoutes
// router.use ( function timelog ( req, res, next) {
//     console.log('Time : ' , Date.now()); 
//     next(); 
// });

//Define the home page route
router.get('/friends', function ( req, res ) {

    console.log ("All Possible Friends"); 
    //res.sendFile(path.join(__dirname, '../public/home.html'));

}); 

//Define the survey page route
router.post('/friends', function ( req, res) {

    console.log ("Incoming Results..."); 
   //res.sendFile(path.join(__dirname, '../public/survey.html')); 

}); 

module.exports = router; 

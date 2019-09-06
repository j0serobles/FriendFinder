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

router.get ('/img/:filename', function ( req, res ) {

    res.sendFile(path.join(__dirname, '../public/' + req.params.filename));
    
});

router.get ('/css/:filename', function ( req, res ) {

    res.sendFile(path.join(__dirname, '../public/' + req.params.filename));
    
});  

router.get ('/data/:filename', function ( req, res ) {

    res.sendFile(path.join(__dirname, '../data/' + req.params.filename));
    
}); 

router.get ('/javascript/:filename', function ( req, res ) {

    res.sendFile(path.join(__dirname, '../javascript/' + req.params.filename));
    
}); 

//Define the survey page route
router.all ('/survey', function ( req, res) {

   res.sendFile(path.join(__dirname, '../public/survey.html')); 

}); 

module.exports = router; 

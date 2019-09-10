// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on persons and questions.
// ===============================================================================

var persons   = require("../data/friends.js");
var questions = require("../data/questions.js");


// Dependencies
// ================================================================================
var express = require('express'); 
var path    = require('path'); 
const fs    = require('fs');

var router  = express.Router(); 

//Middleware that is specific to htmlRoutes
// router.use ( function timelog ( req, res, next) {
//     console.log('Time : ' , Date.now()); 
//     next(); 
// });


// API Routes
// ==============================================================================

// /api/friends GET route
// ==============================================================================
router.get('/friends', function ( req, res ) {
    console.log ("Return All Possible Friends");
    res.json(persons); 
}); 

// /api/questions GET route
// ==============================================================================
router.get('/questions', function ( req, res ) {
    console.log ("Return All Possible questions");
    res.json(questions); 
}); 

// /api/friends POST route
// ===============================================================================
router.post('/friends', function ( req, res) {
 
  var newFriend = req.body;
  var match     = findFriend ( newFriend ); 
  persons.push( newFriend );  
 
  res.json( match );
  
}); 


///////////////////////////////////////////////////////////////////////////////////////
function findFriend ( currentUserObj ) {
 
    console.log ("findFriend(): " + JSON.stringify(currentUserObj, '', 2))  ; 
    
    var topFriend      = null;
    var minDifference  = 40;    // Maximum possible difference between two persons is 40.
                                // (Min. Global Score = 10, Max. Global Score = 50). 
    
    //Get the current user's global score:
    var currentUserGlobalScore = getGlobalScore( currentUserObj.scores );   
    
    console.log( "Current Global Score "  + currentUserGlobalScore); 

    //Traverse the persons array, comparing each person's global score with with the current user's.
    console.log ( JSON.stringify( persons) ) ; 

    persons.forEach ( function ( person, index ) {
        var personGlobalScore = getGlobalScore( person.scores ); 
        var difference = Math.abs ( personGlobalScore - currentUserGlobalScore ) ; 
         
        //If the difference is less than the minimum found so far, this is the new 'top' friend.
        if (difference <= minDifference) {
            minDifference = difference;
            topFriend     = person; 
        }
    });

    return topFriend; 

}

///////////////////////////////////////////////////////////////////////////////////////
function getGlobalScore( scoresArray ) {
  var globalScore = scoresArray.reduce( function (a,b) { return ( parseInt(a) + parseInt(b) ) },  0); 
  return globalScore; 
}

module.exports = router; 
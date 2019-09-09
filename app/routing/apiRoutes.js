var express = require('express'); 
var path    = require('path'); 
const fs    = require('fs');

var router  = express.Router(); 

//Middleware that is specific to htmlRoutes
// router.use ( function timelog ( req, res, next) {
//     console.log('Time : ' , Date.now()); 
//     next(); 
// });


// HTML Routes
// ==============================================================================

// /api/friends GET route
// ==============================================================================
router.get('/friends', function ( req, res ) {
    console.log ("Return All Possible Friends");
    personsCollection = readPersons();
    res.json(personsCollection); 
}); 


// API Routes
// ==============================================================================

// /api/friends POST route
// ===============================================================================
router.post('/friends', function ( req, res) {
 
  var newFriend = req.body;

  writePerson( newFriend ); 
 
  res.json( findFriend( newFriend ) );
  
}); 


///////////////////////////////////////////////////////////////////////////////////////
function findFriend ( currentUserObj ) {
 
    console.log (`findFriend() : currentUserObj = ${currentUserObj}`)
    
    var topFriend      = null;
    var minDifference  = 40;    // Maximum possible difference between two persons is 40.
                                // (Min. Global Score = 10, Max. Global Score = 50). 
    
    //Get the current user's global score:
    var currentUserGlobalScore = getGlobalScore( currentUserObj.scores ); 

    var personsCollection = readPersons();  
    
    //Traverse the personsCollection, comparing each person's global score with with the current user's.
    personsCollection.forEach ( function ( person, index ) {
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
  var globalScore = scoresArray.reduce( function (a,b) { return ( a + b ) },  0); 
  return globalScore; 
}


//////////////////////////////////////////////////////////////////////////////////////////////
// Reads the local file into the persons[] array.  Called by findFriend(). 
function readPersons() {

// Reads the file back into an array

    var obj;
    fs.readFile('output.json', 'utf8', function (err, data) {
    if (err) throw err;

    console.log (`readPersons() : type of data = ` + typeof data); 
    obj = JSON.parse(data);

    console.log (`readPersons() obj = ${JSON.stringify(obj, '', 2)}`);
    
    return(obj);

    });

}

//  Function for writing the person object at the end of the data file .
// =====================================================================
function writePerson( personObj ) { 

    var jsonContent = JSON.stringify( personObj );
    
    fs.appendFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
  
        console.log("JSON file has been saved.");
    }); 
  
  }

module.exports = router; 
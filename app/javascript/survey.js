$( document ).ready( function() { 

    // var friends = loadFriends(); -- TODO: Read all friends from the data/friends.js file.
    var persons = [];

    // Attach callback to button that saves the data and kicks off the friend search.
    $("#find-friend-btn").on("click", function(event) {

        event.preventDefault(); // Preven default form submission.

        //Logic to create a new "Friend" Object.
        var newFriend = {
            name : $('#user-name').val(),
            photo: $('#user-pic').val(),
            scores: []       
            }

        
        //Save the collection of answered questions into 'answers'
        var answers =  $( "input.form-check-input:checked" ); 

        if (answers.length !== 10) {
          alert(' You must answer all questions for better matching.'); 
        }
        else {
          answers.each( function( index ) { 
              newFriend.scores.push( parseInt( $( this ).attr("value") ) );
          });
      }

      findFriend( newFriend , persons); 
      persons.push( newFriend ) ;


    });
      
});

    ///////////////////////////////////////////////////////////////////////////////////////
    function findFriend ( currentUserObj, personsArray ) {

        console.log (JSON.stringify(personsArray, '', 2)); 
        var topFriend      = null;
        var minDifference  = 40;  // Maximum possible difference between two persons is 40.
                                  // (Min. Global Score = 10, Max. Global Score = 50). 
        
        //Traverses the friends[] array, comparing each 'sscores' array with the currentUser's
        var currentUserGlobalScore = getGlobalScore( currentUserObj.scores ); 
        personsArray.forEach ( function ( person, index ) {
          var personGlobalScore = getGlobalScore( person.scores ); 
          var difference = Math.abs ( personGlobalScore - currentUserGlobalScore ) ; 
          if (difference <= minDifference) {
              minDifference = difference;
              topFriend     = person; 
          }
          console.log ( `${currentUserObj.name}(${currentUserGlobalScore})   -  ${person.name}(${personGlobalScore}) = ${difference}`)
          
        });

        if ( !topFriend) {
            console.log ('Sorry. I could not find you a friend.'); 
        }
        else {
        console.log ( ` Your Best Match is ${topFriend.name}`);
        }
         
        //Returns the matched friend.  If more than one has the same score, return the first.

    }
    
    ///////////////////////////////////////////////////////////////////////////////////////
    function getGlobalScore( scoresArray ) {

        var globalScore = scoresArray.reduce( function (a,b) { return ( a + b ) },  0); 
        return globalScore; 

    }

/******************************************************************************/
/* .FILENAME                                                                  */
/*   survey.js                                                                */
/* .WHAT                                                                      */
/*   Front-end javascript code for the survey.html page.                      */
/******************************************************************************/  

$( document ).ready( function() { 

    // This is what happens when the user clicks the "Find Friend" button in the survey page. 
    // The current person's information and answers are collected from the page, then the 
    // API is called to find a match.  

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

      // jQuery.post() method to invoke the API to post the new person's object.
      // And kick off the friend matching process.  The API call should return
      // the matched friend or null object. 
      // ===========================================================================
      $.post("/api/friends", newFriend ,
      function( matchedPerson ) {

        // matchedPerson is the match returned from the list of existing person objects.
        // The API either returns one person object or null, when a match could not be found.
        // ======================================================================================
        
        if ( !matchedPerson ) {
            $("#best-match").text(` No Match Found. `); 
            $('#match-result-modal').html(` Sorry.  No match was found. You have been added.`);
        }
        else {
           
            $("#best-match").text(` Best Match : ${matchedPerson.name}`);
           
            if ( matchedPerson.photo.toLowerCase().search('facebook') > -1 ){
                $('#match-result-modal').html(`<a href="${matchedPerson.photo}" target="_blank">${matchedPerson.name}</a>`);
            }
            else { 
              $('#match-result-modal').html(`<img  class="img-fluid" src=${matchedPerson.photo} alt="Photo of ${matchedPerson.name}">` +
                                        `<p>${matchedPerson.name}</p>`);
            }
        }
        
        $('#results-modal').modal(
        { 
            show : true
        }); 

        // Clear the form when submitting
        $("#user-name").val("");
        $("#user-pic").val("");
        $(".form-check-input").prop("checked", false);

        // TODO: Clear the questions here

      });


    });


    // On page load, render and update the questions.
    $.get( "/api/questions" , function( data ) {
        var questionsArray = data.questions; 
        // console.log ( JSON.stringify(questionsArray)); 
        questionsArray.forEach ( function (question, index) {
            console.log (index + " " + question ) ; 
            renderRow(question, index + 1); 
           
 
        });
    
    });

    // Render each question in the bootstrap row using jQuery:
    function renderRow ( questionText, questionIndex ) { 
    
        var questionRow = "";

        questionRow  = `<div class="form-group"><div class="row border mt-3 bg-light"><div class="col-12 col-sm-6"> ` + 
                       `<input type="text" readonly class="form-control-plaintext" id="question-${questionIndex}"` +
                       ` value="${questionText}"></div>`;
        
        for ( var i = 1; i <= 5 ; i++) {
            questionRow += `<div class="col-1"><div class="form-check form-check-inline">` +
                    ` <input class="form-check-input" type="radio" name="inlineRadioOptions${questionIndex}"` +
                    ` id="inlineRadio${questionIndex}-${i}" value="${i}"><label class="form-check-label"`     +
                    ` for="inlineRadio${questionIndex}-${i}">${i}</label></div></div>`;
        }

        questionRow += `</div><!-- End Row --></div>`;

        $("#questionHeader").after(questionRow);

    }

      
});
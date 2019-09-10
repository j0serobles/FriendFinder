// An array of strings with the questions to include in the questionnaire. 
// This is exported as a module to be used by the survey logic. 
// The idea is to have this in a separate module so it can be changed
// without modifying the code. 

//==========================================================================
var questions = [
    "1) I act comfortably with others.",
    "2) I use flattery to get ahead.", 
    "3) I enjoy wild flights of fantasy", 
    "4) I make friends easily.", 
    "5) I love large parties.", 
    "6) I tend to vote for liberal political candidates.", 
    "7) I try to lead others.", 
    "8) I feel sympathy for those who are worse off than myself.", 
    "9) I like to tidy up.", 
    "10) I get upset easily."
];

module.exports.questions = questions; 
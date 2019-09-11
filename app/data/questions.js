// An array of strings with the questions to include in the questionnaire. 
// This is exported as a module to be used by the survey logic. 
// The idea is to have this in a separate module so it can be changed
// without modifying the code. 

//==========================================================================
var questions = [
    "I act comfortably with others.",
    "I use flattery to get ahead.", 
    "I enjoy wild flights of fantasy", 
    "I make friends easily.", 
    "I love large parties.", 
    "I tend to vote for liberal political candidates.", 
    "I try to lead others.", 
    "I feel sympathy for those who are worse off than myself.", 
    "I like to tidy up.", 
    "I get upset easily."
];

module.exports.questions = questions; 
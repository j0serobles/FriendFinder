// Objects with the application's data (person Objects).
// this is an array of person Objects that is
// exported as a module so it can be imported into other programs.
//================================================================
var personsArray = [
    {
        "name":"Ahmed",
        "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        "scores":[
            5,
            1,
            4,
            4,
            5,
            1,
            2,
            5,
            4,
            1
          ]
      }
];   // An array of person objects. 

module.exports = personsArray;
const getAllAvailability = require("./getAllAvailability");

const getLabs = require("./getLabs");
const COURSES_PATH = "src/inputFiles/courses.xlsx";



const getSchedules = (schedulePath) => {
   
    let labs = getLabs(COURSES_PATH);

    let allAvailability = getAllAvailability();
    
    //print all availability
    /*
    for (let i = 0; i < allAvailability.length; i++) {
        console.log(allAvailability[i]);
        console.log(i);
    }
    */


    //prints all labs
    /*
    for (let i = 0; i < labs.length; i++) {
        console.log(labs[i]);
        console.log(i);
    }
    */

}


module.exports = getSchedules;
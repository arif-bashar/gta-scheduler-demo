// Import modules
const getGTAs = require("./helpers/getGTAs");
const getCombinations = require("./helpers/getCombinations");
const getSimpleLabs = require("./helpers/getSimpleLabs");
const getCompleteSchedules = require("./helpers/getCompleteSchedules");
const getSchedules = require("./helpers/getSchedules");

// Path parameters
// const COURSES_PATH = "src/inputFiles/courses.xlsx";
const GTA_PATH = "src/inputFiles/schedules.xlsx";


function main() {
  //let labs = getLabs(COURSES_PATH);
  let gtas = getGTAs(GTA_PATH);

 // getSimpleLabs();
  
  



  //getCombinations();

  //getCompleteSchedules();

  sched = getSimpleLabs();
  for (let i = 0; i < sched.length; i++) {
    console.log(sched[i].Student);
    console.log(sched[i].labs);

  }

  //console.log(labs);
  //console.log(gtas[0]);
}

main();
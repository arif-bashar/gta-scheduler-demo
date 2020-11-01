// Import modules
const getLabs = require("./helpers/getLabs");
const getGTAs = require("./helpers/getGTAs");

// Path parameters
const COURSES_PATH = "src/inputFiles/courses.xlsx";
const GTA_PATH = "src/inputFiles/schedules.xlsx";


function main() {
  let labs = getLabs(COURSES_PATH);
  let gtas = getGTAs(GTA_PATH);

  schedule = {};

  
  // console.log(labs);
  // console.log(gtas[0].Busy);

}

main();


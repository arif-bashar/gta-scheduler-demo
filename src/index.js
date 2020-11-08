// Import modules
const getSchedules = require("./helpers/getSchedules");

// Path parameters
// const COURSES_PATH = "src/inputFiles/courses.xlsx";
// const GTA_PATH = "src/inputFiles/schedules.xlsx";


function main() {
  //let labs = getLabs(COURSES_PATH);
  //let gtas = getGTAs(GTA_PATH);

  getSchedules();

  //console.log(labs);
  //console.log(gtas[0]);
}

main();
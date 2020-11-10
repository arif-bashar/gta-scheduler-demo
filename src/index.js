// Import modules
const getGTAs = require("./helpers/getGTAs");
const getCombinations = require("./helpers/getCombinations");


// Path parameters
// const COURSES_PATH = "src/inputFiles/courses.xlsx";
const GTA_PATH = "src/inputFiles/schedules.xlsx";


function main() {
  //let labs = getLabs(COURSES_PATH);
  let gtas = getGTAs(GTA_PATH);

  getCombinations();

  //for (let i = 0; i < gtas.length; i++) {
  //  console.log(gtas[i]);
  //  console.log(i);
  //}

  //console.log(labs);
  //console.log(gtas[0]);
}

main();
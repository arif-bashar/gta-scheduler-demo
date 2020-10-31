// Import modules
const xlsx = require("xlsx");
const fs = require("fs");
const timeConverter = require("./helpers/timeConverter");
const getLabs = require("./helpers/getLabs");
const getGTAs = require("./helpers/getGTAs");

// Path parameters
const COURSES_PATH = "src/inputFiles/courses.xlsx";
const GTA_PATH = "src/inputFiles/schedules.xlsx";


function main() {
  let labs = getLabs(COURSES_PATH);
  let gtas = getGTAs(GTA_PATH);
  console.log(labs);
  console.log(gtas);

}

main();

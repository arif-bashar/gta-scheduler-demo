// Import modules
const getGTAs = require("./helpers/getGTAs");
const getSimpleLabs = require("./helpers/getSimpleLabs");

// Path parameters
const GTA_PATH = "src/inputFiles/schedules.xlsx";


function main() {

  sched = getSimpleLabs();
  for (let i = 0; i < sched.length; i++) {
    console.log("-------------------------------------------------------------------------");
    console.log("GTA Name: " + sched[i].Student);
    for(let j = 0; j < sched[i].labs.length; j++){
      console.log("Lab:");
      console.log(sched[i].labs[j]);
    }

    for(let j = 0; j < sched[i].duplicates.length; j++){
      console.log("These two labs happen at the same time (Duplicates):");
      console.log(sched[i].duplicates[j]);
    }

  }



}

main();
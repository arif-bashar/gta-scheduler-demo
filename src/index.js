// Import modules
const xlsx = require('xlsx');
const fs = require('fs');


/* Returns an object array of CS Labs 
   Returns  object: 
   { CRN: string, COURSE: string, TITLE: string, 
   DAYS: string, TIME: string, PROF: string }
*/
function getLabs() {

  // Read from the courses spreadsheet and grab the excel sheet
  let coursesBook = xlsx.readFile("src/inputFiles/courses.xlsx");
  let coursesSheetName = coursesBook.SheetNames[0];
  let coursesSheet = coursesBook.Sheets[coursesSheetName];

  // Convert from xlsx sheet to JSON 
  let courses = xlsx.utils.sheet_to_json(coursesSheet);

  // Object array to hold list of labs
  let labs = [];

  // Keep track of the previous CRN
  let prevCRN = courses[0].CRN;

  // Iterate through all the course objects in the 
  for (let i = 1; i < courses.length; i++) {
    /* If there is a duplicate course with the same CRN,
      then it is considered a lab */
    if (courses[i].CRN == prevCRN) {
      labs.push({
        CRN: courses[i].CRN, 
        COURSE: courses[i].SUBJ + ' ' + courses[i].CRSE + ' ' + courses[i].SEC,
        TITLE: courses[i].TITLE,
        DAYS: getDays(courses[i]),
        TIME: courses[i].BEGIN + ' - ' + courses[i].END_1,
        PROF: courses[i].FIRST + ' ' + courses[i].LAST
      });
    }
    
    // Update the CRN
    prevCRN = courses[i].CRN;
  }

  return labs;
}

function getGTA() {

}

// Concatenates all the day properties in each lab object
function getDays(lab) {
  let days = "";

  // Checks if these keys are in the object
  if ("M" in lab)
    days += "M ";

  if ("T" in lab)
    days += "T ";

  if ("W" in lab)
    days += "W ";
  
  if ("TR" in lab)
    days += "TR ";

  if ("F" in lab)
    days += "F ";

  // Remove the extra whitespace at the end
  days = days.slice(0, -1);

  return days;
}

function main() {

  let labs = getLabs();
  console.log(labs);

}

main();


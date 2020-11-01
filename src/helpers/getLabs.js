const xlsx = require("xlsx");

/* Returns an object array of CS Labs 
   Return object: 
   { CRN: string, COURSE: string, TITLE: string, 
   DAYS: string, TIME: string, PROF: string }
*/
const getLabs = (coursesPath) => {
  // Read from the courses spreadsheet and grab the excel sheet
  let coursesBook = xlsx.readFile(coursesPath);
  let coursesSheetName = coursesBook.SheetNames[0];
  let coursesSheet = coursesBook.Sheets[coursesSheetName];

  // Convert from xlsx sheet to JSON
  let courses = xlsx.utils.sheet_to_json(coursesSheet);

  // Object array to hold list of labs
  let labs = [];

  // Keep track of the previous CRN
  let prevCRN = courses[0].CRN;

  // Iterate through all the course objects in the courses sheet
  for (let i = 1; i < courses.length; i++) {
    /* If there is a duplicate course with the same CRN,
      then it is considered a lab */
    if (courses[i].CRN == prevCRN) {
      labs.push({
        CRN: courses[i].CRN,
        Course: courses[i].SUBJ + " " + courses[i].CRSE + " " + courses[i].SEC,
        Title: courses[i].TITLE,
        Days: getDays(courses[i]),
        Begin: parseInt(courses[i].BEGIN),
        End: parseInt(courses[i].END_1),
        Prof: courses[i].FIRST + " " + courses[i].LAST,
      });
    }

    // Update the CRN
    prevCRN = courses[i].CRN;
  }

  return labs;
}

// Concatenates all the day properties in each lab object
const getDays = (lab) => {
  let days = {
    M: false,
    T: false,
    W: false,
    TR: false,
    F: false
  }

  // Checks if these keys are in the object
  if ("M" in lab) days.M = true;

  if ("T" in lab) days.T = true;

  if ("W" in lab) days.W = true;

  if ("TR" in lab) days.TR = true;

  if ("F" in lab) days.F = true;

  // Remove the extra whitespace at the end
  // days = days.slice(0, -1);

  return days;
}


module.exports = getLabs;

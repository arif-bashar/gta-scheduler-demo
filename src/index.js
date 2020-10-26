let xlsx = require('xlsx');
const fs = require('fs');

/* Returns an object array of CS Labs 
   Returns  object: { CRN: string, COURSE: string, TITLE: string, 
    DAYS: string, TIME: string, PROF: string }   */
function getLabs() {

  // Read from the courses spreadsheet and grab the excel sheet
  let coursesBook = xlsx.readFile("src/inputFiles/courses.xlsx");
  let coursesSheetName = coursesBook.SheetNames[0];
  let coursesSheet = coursesBook.Sheets[coursesSheetName];

  // Convert from xlsx sheet to JSON 
  let sheetObjs = xlsx.utils.sheet_to_json(coursesSheet);
  let prevCRN = sheetObjs[0].CRN;

  let labs = [];

  for (let i = 1; i < sheetObjs.length; i++) {
    if (sheetObjs[i].CRN == prevCRN) {
      labs.push({
        CRN: sheetObjs[i].CRN, 
        COURSE: sheetObjs[i].SUBJ + ' ' + sheetObjs[i].CRSE + ' ' + sheetObjs[i].SEC,
        TITLE: sheetObjs[i].TITLE,
        DAYS: getDays(sheetObjs[i]),
        TIME: sheetObjs[i].BEGIN + ' - ' + sheetObjs[i].END_1,
        PROF: sheetObjs[i].FIRST + ' ' + sheetObjs[i].LAST
      });
    }
    
    prevCRN = sheetObjs[i].CRN;
  }

  console.log(labs);

}

function getDays(course) {
  let days = "";

  if ("M" in course)
    days += "M ";
  
  if ("T" in course)
    days += "T ";

  if ("W" in course)
    days += "W ";
  
  if ("TR" in course)
    days += "TR ";

  if ("TR" in course)
    days += "TR ";

  return days;
}

function main() {
  getLabs();

}

main();


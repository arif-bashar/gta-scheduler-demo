// Import modules
const xlsx = require("xlsx");
const fs = require("fs");

const COURSES_PATH = "src/inputFiles/courses.xlsx";
const GTA_PATH = "src/inputFiles/schedules.xlsx";

/* Returns an object array of CS Labs 
   Return object: 
   { CRN: string, COURSE: string, TITLE: string, 
   DAYS: string, TIME: string, PROF: string }
*/
function getLabs() {
  // Read from the courses spreadsheet and grab the excel sheet
  let coursesBook = xlsx.readFile(COURSES_PATH);
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
        COURSE: courses[i].SUBJ + " " + courses[i].CRSE + " " + courses[i].SEC,
        TITLE: courses[i].TITLE,
        DAYS: getDays(courses[i]),
        BEGIN: parseInt(courses[i].BEGIN),
        END: parseInt(courses[i].END_1),
        PROF: courses[i].FIRST + " " + courses[i].LAST,
      });
    }

    // Update the CRN
    prevCRN = courses[i].CRN;
  }

  return labs;
}

/* Returns an object array of GTAs 
   Return object: 
   { CRN: string, COURSE: string, TITLE: string, 
   DAYS: string, TIME: string, PROF: string }
*/
function getGTAs() {
  // Read from the schedule spreadsheet and grab the excel sheet
  let scheduleBook = xlsx.readFile(GTA_PATH);
  let scheduleSheetName = scheduleBook.SheetNames[0];
  let scheduleSheet = scheduleBook.Sheets[scheduleSheetName];

  // Convert from xlsx sheet to JSON
  let schedules = xlsx.utils.sheet_to_json(scheduleSheet);

  // Object array to hold list of gtas
  let gtas = [];
  let gta = {};
  let prevCellVal;

  // console.log(scheduleSheet["A1"]);

  // Iterate through all the course objects in the
  for (let cell in scheduleSheet) {
    const cellAsString = cell.toString();

    if (
      cellAsString[1] !== "r" &&
      cellAsString[1] !== "m" &&
      cellAsString[1] > 0
    ) {
      if (cellAsString[0] === "A") {
        let value = scheduleSheet[cell].v;
        
        /* We know that student name cell always
          precedes the "CRN:" cell. If there is no student name
          before that cell, throw an error. */
        if (value.includes("CRN:")) {
          // Executes if previous cell value is not a student name
          if (notStudentName(prevCellVal))
            throw new Error("There is a schedule with no student name");
          else {
            //
            gta.Student = prevCellVal;
            gtas.push(gta);
            gta = {};
          }
        }
      }
    }
    prevCellVal = scheduleSheet[cell].v;
  }

  appendDays(scheduleSheet, gtas);
  appendTime(scheduleSheet, gtas);


  return gtas;
}

function appendDays(scheduleSheet, gtas) {
  let busy;
  let sched;
  let index = -1;

  for (let cell in scheduleSheet) {
    const cellAsString = cell.toString();

    if (
      cellAsString[1] !== "r" &&
      cellAsString[1] !== "m" &&
      cellAsString[1] > 0
    ) {
      if (cellAsString[0] === "H") {
        let value = scheduleSheet[cell].v;
        
        if (value === "DAYS" && index < gtas.length) {
          busy = [];
          sched = {};
          index++
        } else {
          sched = {
            Days: value,
            Time: ''
          }
          busy.push(sched);
          gtas[index].Busy = busy;

        }
      }
    }
  }
}

function appendTime(scheduleSheet, gtas) {
  let busy;
  let sched;
  let index = -1;
  let busyIndex = 0;

  for (let cell in scheduleSheet) {
    const cellAsString = cell.toString();

    if (
      cellAsString[1] !== "r" &&
      cellAsString[1] !== "m" &&
      cellAsString[1] > 0
    ) {
      if (cellAsString[0] === "I") {
        let value = scheduleSheet[cell].v;
        
        if (value === "TIME" && index < gtas.length) {
          // console.log(busyIndex);
          busy = [];
          sched = {};
          busyIndex = 0;
          index++;
        } else {
          // if (busyIndex === gtas[index].Busy.length) {
          //   busyIndex = 0;
          //   console.log("length is", gtas[index].Busy.length)

          // }
          if (value.includes("AM") || value.includes("PM")) {
            gtas[index].Busy[busyIndex].Time = value;
            // console.log(index, busyIndex);
            // console.log(gtas[index].Busy);
            busyIndex++;
          }

        }
      }
    }
  }
}

// Concatenates all the day properties in each lab object
function getDays(lab) {
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

function notStudentName(cellValue) {
  return cellValue.includes(":");
}

function main() {
  let labs = getLabs();
  let gtas = getGTAs();
  console.log(labs);
  console.log(gtas);

}

main();

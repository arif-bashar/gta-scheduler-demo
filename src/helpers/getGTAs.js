const xlsx = require("xlsx");
const timeConverter = require("./timeConverter");

/* Returns an object array of GTAs 
   Return object: 
   { Student: string, Busy: [{ Days: {}}], TITLE: string, 
   DAYS: string, TIME: string, PROF: string }
*/
const getGTAs = (gtaPath) => {
  // Read from the schedule spreadsheet and grab the excel sheet
  let scheduleBook = xlsx.readFile(gtaPath);
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

const appendDays = (scheduleSheet, gtas) => {
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
            Begin: 0,
            End: 0,
          }
          busy.push(sched);
          gtas[index].Busy = busy;

        }
      }
    }
  }
}

const appendTime = (scheduleSheet, gtas) => {
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
          busy = [];
          sched = {};
          busyIndex = 0;
          index++;
        } else {
          if (value.includes("AM") || value.includes("PM")) {
            let time = value.split("-");
            let begin = timeConverter(time[0]);
            let end = timeConverter(time[1]);

            gtas[index].Busy[busyIndex].Begin = begin;
            gtas[index].Busy[busyIndex].End = end;

            busyIndex++;
          }
        }
      }
    }
  }
}


const notStudentName = (cellValue) => {
  return cellValue.includes(":");
}

module.exports = getGTAs;
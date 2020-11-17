const getCombinations = require("./getCombinations");
const getLabs = require("./getLabs");

const COURSES_PATH = "src/inputFiles/courses.xlsx";
/*
GTA: Lab1 lab2
Schedule obj:
id: index of loop
CRN1: [GTA1 GTA2]
CRN2: [list of gtas]
*/



/*  
    schedDetails:
    [
    [    
    Name
    {
        Labe info
    }
    ],
    [
    Name
    {
        Lab info
    }


    ]
    ]
*/


/*
Output:
[
{
    Schedule 1,
    Name,
    {
        Lab Object
    },
    Name,
    {
        Lab Object
    }

},
{
    Schedule 2

}
]
*/


/*
calculate schedule

check to see if all gtas are true (meaning they've all been assigned) &&
check to see if all numGTAs on all labs are 0

the schedules is a correct schedule
*/



const getCompleteSchedules = () => {
    let combinations = getCombinations();
    let allLabs = getLabs(COURSES_PATH);

    /*
    combination object:
    GTA1:Student:name
        combos: [lab1
        lab2
        lab1, lab2]

    keep track of lab assignments in allLabs:
        Lab: CRN
            NumGTAs: 1  
            Everytime a GTA is assigned to a lab, subtract 1 from NumGTAs until 0

            When all of them are 0, we can stop assigning GTAs

    Keep track of GTA assignments:
        {
            'name1: True
            'name': False
        }


        loop through combinations:

            loop through 
        */


    //prints all 14 labs
   // for (let i = 0; i < allLabs.length; i++) {
   //     console.log(allLabs[i]);
   // }



    



    //creates object of gtaNames and boolean values
    gtaAssignment = new Object();
    for (let i = 0; i < combinations.length; i++) {
        gtaAssignment[combinations[i].Student] = false;
    }
    //console.log(gtaAssignment);
    
    schedule = new Object();
    for (let i = 0; i < allLabs.length; i++) {
        schedule[allLabs[i].CRN] = [];
    }
    //console.log(schedule);

    let allSchedules = [];


    //giant for loop
    for (let i = 0; i < combinations.length; i++) {

        let trueSchedule = false;

        //push name
        //decrement 

        for (let j = 0; j < combinations.length; j++) {
            //schedule.push(combinations.Student);



        }
    }

}




module.exports = getCompleteSchedules;




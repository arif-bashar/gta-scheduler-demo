const getSchedules = require("./getSchedules");


class SimpleSchedule {
    constructor() {
        this.Student = "default"; 
        this.labs = [];
    }
}

const getSimpleLabs = () => {
    let allSchedules = getSchedules();

    let allGTASimpleLabs = [];

    for (let i = 0; i < allSchedules.length; i++) {
        allGTASimpleLabs.push(listLabs(allSchedules[i]));
    }

    return allGTASimpleLabs;
}

function sameTime(lab1, lab2){

    if (lab1.Begin === lab2.Begin)
        {
            return true;
        }
    else if (lab1.Begin > lab2.Begin && lab1.Begin < lab2.End){
        
        return true;
    }
    else if (lab2.Begin > lab1.Begin && lab2.Begin < lab1.End) {
       
        return true;
    }
    else{
        return false;
    }

}

function listLabs(workingLabs) {
    let simpleLabs = [];
    let simpleSchedule = new SimpleSchedule();
    simpleSchedule.Student = workingLabs.Student;

    //console.log(workingLabs.Student);
    let skip_lab = []; //labs to not add to simpleLabs to avoid duplicates
    //loop through labs for a GTA, if the lab does not overlap with other labs for GTA, just add it to simpleLabs
    let items = []; //labs that do overlap , made up of 2 element arrays
    for(let i = 0; i < workingLabs.labs.length; i++) {

            //loop thorugh rest of labs to check for overlapping times
            for(let j = i + 1; j < workingLabs.labs.length; j++) {

                //check if all days are same
                if ((workingLabs.labs[i].Days.M === true) && (workingLabs.labs[j].Days.M === true)) {
                    //Check if times are same on that day
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;
                        }                
                }
                if ((workingLabs.labs[i].Days.T === true) && (workingLabs.labs[j].Days.T === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j])) 
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;                   
                      }
                }
                if ((workingLabs.labs[i].Days.W === true) && (workingLabs.labs[j].Days.W === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;                
                      }
                }
                if ((workingLabs.labs[i].Days.R === true) && (workingLabs.labs[j].Days.R === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;                  
                      }
                }
                if ((workingLabs.labs[i].Days.F === true) && (workingLabs.labs[j].Days.F === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))  
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;               
                        }
                }
    
            }
            
    }

    for(let i = 0; i < workingLabs.labs.length; i++) {
        //if this lab is not overlapping at all
        if(!(skip_lab.includes(workingLabs.labs[i]))){
            simpleLabs.push(workingLabs.labs[i]);
        }
    }

    //Now append the pairs that are overlapping
    simpleLabs = simpleLabs.concat(items);

    simpleSchedule.labs = simpleLabs;
    return simpleSchedule;
}












/*
Output

[[{Lab1}],
[{lab2}, {lab3}],
[{lab3}, {lab4}]]






John
CRN1    TITLE       1EarliestTIME    DAYS
CRN2    TITLE       2EarliestTIME    DAYS

*/







module.exports = getSimpleLabs;
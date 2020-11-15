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

    /*
    for (let i = 0; i < allSchedules.length; i++) {
        console.log(allSchedules[i]);
    }
    */


    for (let i = 0; i < allSchedules.length; i++) {
        allGTASimpleLabs.push(listLabs(allSchedules[i]));
    }

    //print everything
    for (let i = 0; i < allGTASimpleLabs.length; i++) {

        for (let j = 0; j < allGTASimpleLabs[i].labs.length; j++) {
            //if (allGTASimpleLabs[i][j].length === 2) {
                console.log(allGTASimpleLabs[i].Student);
                console.log(allGTASimpleLabs[i].labs[j]); 
            //}
        }  
    }
    


    return allGTASimpleLabs;
}

function listLabs(workingLabs) {
    let simpleLabs = [];
    let simpleSchedule = new SimpleSchedule();
    simpleSchedule.Student = workingLabs.Student;

    for(let i = 0; i < workingLabs.labs.length; i++) {

        let flag = false; //this becomes true if the labs have overlapping times
        let indices = [];
    
            for(let j = i + 1; j < workingLabs.labs.length; j++) {

            //check if all days are same
                if ((workingLabs.labs[i].Days.M === true) && (workingLabs.labs[j].Days.M === true)) {
                    if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                        (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                        ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                        (workingLabs.labs[j].begin <= workingLabs.labs[i].end)) || 
                        (workingLabs.labs[i].begin === workingLabs.labs[j].begin))
                    
                   // if ((workingLabs.labs[i].begin === workingLabs.labs[j].begin))  
                        {
                            flag = true;
                            indices.push(j);
                        }                
                }
                else if ((workingLabs.labs[i].Days.T === true) && (workingLabs.labs[j].Days.T === true)) {
                    
                    if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                        (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                        ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                        (workingLabs.labs[j].begin <= workingLabs.labs[i].end)) || 
                        ((workingLabs.labs[i].begin === workingLabs.labs[j].begin)))
                    
                   //if ((workingLabs.labs[i].begin === workingLabs.labs[j].begin))    
                        {
                            flag = true;
                        }
                }
                else if ((workingLabs.labs[i].Days.W === true) && (workingLabs.labs[j].Days.W === true)) {
                    
                    if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                        (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                        ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                        (workingLabs.labs[j].begin <= workingLabs.labs[i].end)) || 
                        ((workingLabs.labs[i].begin === workingLabs.labs[j].begin)))
                       
                    //if ((workingLabs.labs[i].begin === workingLabs.labs[j].begin))  
                            
                        {
                            flag = true;
                        }
                }
                else if ((workingLabs.labs[i].Days.R === true) && (workingLabs.labs[j].Days.R === true)) {
                    
                    if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                        (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                        ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                        (workingLabs.labs[j].begin <= workingLabs.labs[i].end)) || 
                        ((workingLabs.labs[i].begin === workingLabs.labs[j].begin)))
                    
                    //if ((workingLabs.labs[i].begin === workingLabs.labs[j].begin))   
                        {
                            flag = true;
                        }
                }
                else if ((workingLabs.labs[i].Days.F === true) && (workingLabs.labs[j].Days.F === true)) {
                    
                    if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                        (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                        ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                        (workingLabs.labs[j].begin <= workingLabs.labs[i].end)) || 
                        ((workingLabs.labs[i].begin === workingLabs.labs[j].begin)))
                    
                    //if ((workingLabs.labs[i].begin === workingLabs.labs[j].begin))          
                        {
                            flag = true;
                        }
                }
    
                if (flag === true) {
                    let arr = [];
    
                    arr.push(workingLabs.labs[i]);
                    arr.push(workingLabs.labs[j]);
                    //console.log(arr);
                    simpleLabs.push(arr);
    
                }
                //no overlap
                else if (flag === false){
                    let arr = [];
                    simpleLabs.push([workingLabs.labs[i]]);
                }
                
            }
            
        }
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
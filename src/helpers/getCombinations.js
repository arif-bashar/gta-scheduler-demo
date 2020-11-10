const getSchedules = require("./getSchedules");


class Combinations {
    constructor() {
        this.Student = "default";
        this.combos = []; //array of lab objects
        //[[lab1, lab2], [lab1], [lab2]]
    }
}

const getCombinations = () => {

    let allWorkingLabs = getSchedules();

    let allScheduleCombos = [];


    for (let i = 0; i < allWorkingLabs.length; i++) {
        allScheduleCombos.push(oneCombination(allWorkingLabs[i]));
    }



    //print everything
    for (let i = 0; i < allScheduleCombos.length; i++) {
        //console.log(allScheduleCombos[i].Student);
        let eachStudent = 0;
        for (let j = 0; j < allScheduleCombos[i].combos.length; j++) {
            console.log(allScheduleCombos[i].Student);
            console.log(allScheduleCombos[i].combos[j]);
            eachStudent++;
        }
        console.log(eachStudent);
    }

    return allScheduleCombos;
}

//This function finds all the possible combinations of the labs
//that fit a GTA's schedule. The labs in workingLabs could potentially
//have overlapping times so exclude combos that have overlap.
function oneCombination(workingLabs) {
    //push individual labs to array of combos
    //Then find pairs of labs that have agreeing times

    let gta = new Combinations();

    gta.Student = workingLabs.Student;

    //inidividual labs
    for (let i = 0; i < workingLabs.labs.length; i++) {
        //put single lab into array
        //put array into gta.combos
        let arr = [];
        arr.push(workingLabs.labs[i]);
        gta.combos.push(arr);
    }


    
    for(let i = 0; i < workingLabs.labs.length; i++) {

        let flag = false; //this becomes true if the labs have overlapping times

        for(let j = i + 1; j < workingLabs.labs.length; j++) {
        //if the days are not same, then it is good

        //if days are same, check if time overlaps
        //if time does not overlap, then add pair to gta.combos
        //if time overlaps, do not add it
        //check if all days are same
            if ((workingLabs.labs[i].Days.M === true) && (workingLabs.labs[j].Days.M === true)) {
                if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                    (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                    ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                    (workingLabs.labs[j].begin <= workingLabs.labs[i].end)))
                    {
                        flag = true;
                    }                
            }
            if ((workingLabs.labs[i].Days.T === true) && (workingLabs.labs[j].Days.T === true)) {
                if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                    (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                    ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                    (workingLabs.labs[j].begin <= workingLabs.labs[i].end)))
                    {
                        flag = true;
                    }
            }
            if ((workingLabs.labs[i].Days.W === true) && (workingLabs.labs[j].Days.W === true)) {
                if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                    (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                    ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                    (workingLabs.labs[j].begin <= workingLabs.labs[i].end)))
                    {
                        flag = true;
                    }
            }
            if ((workingLabs.labs[i].Days.R === true) && (workingLabs.labs[j].Days.R === true)) {
                if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                    (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                    ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                    (workingLabs.labs[j].begin <= workingLabs.labs[i].end)))
                    {
                        flag = true;
                    }
            }
            if ((workingLabs.labs[i].Days.F === true) && (workingLabs.labs[j].Days.F === true)) {
                if (((workingLabs.labs[i].begin >= workingLabs.labs[j].begin) &&
                    (workingLabs.labs[i].begin <= workingLabs.labs[j].end)) || 
                    ((workingLabs.labs[j].begin >= workingLabs.labs[i].begin) &&
                    (workingLabs.labs[j].begin <= workingLabs.labs[i].end)))
                    {
                        flag = true;
                    }
            }

            //push combo to array of arrays
            //if flag if true then dont push
            if (!flag) {
                let arr = [];

                arr.push(workingLabs.labs[i]);
                arr.push(workingLabs.labs[j]);
                gta.combos.push(arr);
            }
        }
    }
    

    return gta;
}

module.exports = getCombinations;





/*
    Output

    Student name1: CRN
        remaining availability
    Student name2: CRN
        remaining availability
*/
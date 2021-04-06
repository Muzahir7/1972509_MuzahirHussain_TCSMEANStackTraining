let fs = require("fs");
let obj = require("readline-sync");
let emp = new Array(); //array to hold the records

    
    function readRecords(){
        let recordsCount = obj.question("How many records do you wanna enter: ");

        let numRecords = parseInt(recordsCount);
        debugger;
        for (let i = 0; i < numRecords; i++){
            console.log("Record Number: "+(i+1));
            let fname = obj.question("Enter your first name: ");
            let lname = obj.question("Enter your last name: ");
            let gender = obj.question("Enter your gender: ");
            let email = obj.question("Enter your email: ");
            debugger;
            let d = new Date();
            let date = d.toLocaleDateString();
            let time = d.toLocaleTimeString();
            debugger;
            let data = {};
            data["fname"] = fname;
            data["lname"] = lname;
            data["gender"] = gender;
            data["email"] = email;
            data["date"] = date;
            data["time"] = time;
            debugger;
            emp.push(data);
            debugger;
            console.log("======================================================");

        }
        //console.log(emp);
    }

    function storeRecords(){
        let jsonData = JSON.stringify(emp);
        debugger;
        fs.writeFileSync("employeeData.json", jsonData);
        console.log('Data written to file Successfully');
    }

    // readRecords();
    // storeRecords();


module.exports={readRecords, storeRecords}


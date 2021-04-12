let http = require("http");
let url = require("url");
let port = 9999;

let fs = require("fs");
let obj = require("readline-sync");

// let empData = new Array();

let htmlContent = `
    <div>
        <h2>Add Task</h2>
        <form action="/add" method="get">
            <label>Emp Id:</label>
            <input type="text" name="empid"/><br/>
            <label>Task Id:</label>
            <input type="text" name="taskid"/><br/>
            <label>Task:</label>
            <input type="text" name="task"/><br/>
            <label>Deadline:</label>
            <input type="date" name="deadline"/><br/>
            <input type="submit" value="Add Task"/>
            <input type="reset" value="reset"/>
        </form>
        <hr/>
        <h2>Delete Task</h2>
        <form action="/delete" method="get">
            <label>Task Id:</label>
            <input type="text" name="taskid"/><br/>
            <input type="submit" value="Delete"/>
        </form>
        <hr/>
        <h2>List Tasks</h2>
        <form action="/list" method="get">
            <input type="submit" value="List All Tasks"/>
        </form>
        <div id="table_container">

        </div>
    </div>
`

let server = http.createServer((req, res)=> {
    //console.log(url.parse(req.url, true));
    var pathInfo = url.parse(req.url, true).pathname;
    if (pathInfo =="/"){
        res.setHeader("content-type", "text/html");
        res.end(htmlContent);
    }else if(pathInfo=="/add"){
        let data = url.parse(req.url, true).query;
        writeToJson(data);
        res.setHeader("content-type", "text/html");
        res.end(htmlContent);
    }
    else if(pathInfo=="/delete"){
        let data = url.parse(req.url, true).query;
        deleteTask(data.taskid);
        res.setHeader("content-type", "text/html");
        res.end(htmlContent);
    }
    else if(pathInfo=="/list"){
        //displayTasks();
        let rData = fs.readFileSync("employeeTasks.json");
        let jsonString = rData.toString();
        let empData= JSON.parse(jsonString);
        
        res.write(
            `<table>
                <tr>
                    <th>Emp Id</th>
                    <th>Task Id</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>
            `
        );
        for (let i = 0; i < empData.length; i++){
            res.write(
                `
                <tr>
                    <td>${empData[i].empid}</td>
                    <td>${empData[i].taskid}</td>
                    <td>${empData[i].task}</td>
                    <td>${empData[i].deadline}</td>
                </tr>
                `
            );
        }
        res.write(`</table`);
        
        res.end();

    }
});
server.listen(port, 
    ()=> console.log(`server running on port number ${port}`));


function writeToJson(data){
    //console.log(data);
    //put json data into the array
    let rData = fs.readFileSync("employeeTasks.json");
    let jsonString = rData.toString();
    let empData= JSON.parse(jsonString);
    empData.push(data);
    //console.log(empData.length);
    let jsonData = JSON.stringify(empData);
    fs.writeFileSync("employeeTasks.json", jsonData);
    console.log('file written Successfully');
    
}

function deleteTask(taskId){
    let rData = fs.readFileSync("employeeTasks.json");
    let jsonString = rData.toString();
    let empData= JSON.parse(jsonString);
    for (let i = 0; i < empData.length; i++){
        if (empData[i].taskid == taskId){
            //console.log("task Found------>");
            empData.splice(i, 1);
            break;
        }
    }
    let jsonData = JSON.stringify(empData);
    fs.writeFileSync("employeeTasks.json", jsonData);
    console.log('Task Deleted Successfully');

}


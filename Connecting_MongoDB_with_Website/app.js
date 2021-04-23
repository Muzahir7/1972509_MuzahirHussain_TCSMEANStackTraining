let obj = require("mongoose"); //load the mongoose module
//load required modules
let app = require("express")();
let bodyParser = require("body-parser");

let port = 9090;
app.use(bodyParser.urlencoded({extended:true})); //enable body data


//setting up mongoDB connection
        //Define the Schema
        var CoursesSchema = obj.Schema({
            _id:Number,
            cname:String,
            cdescription: String,
            camount:Number
        });
        //Creating model using schema
        var Course = obj.model("",CoursesSchema,"Courses");

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

//adding courses
app.get("/add",(req,res)=> {
    res.sendFile(__dirname+"/add.html");
})
app.post("/addCourse", (req,res)=>{
    let id = eval(req.body.id);
    let name = req.body.name;
    let description = req.body.description;
    let amount = eval(req.body.amount);
//    store the data in mongoDB
    obj.Promise = global.Promise;
    let url = "mongodb://localhost:27017/meanstack";
    const mongooseDbOption = {  //to avoid warning
            useNewUrlParser: true,
            useUnifiedTopology: true
    }
    obj.connect(url, mongooseDbOption);  //ready to connect
    let db = obj.connection;  //connected to database
    db.on("error",(err)=>console.log(err));
    db.once("open",()=>{


        //creating reference using model
        let c1 = new Course({_id:id,cname:name,cdescription:description,camount:amount});
        c1.save((result,err)=>{
            if(!err){
                console.log("record inserted successfully"+result)
            }else{
                console.log(err);
            }
            obj.disconnect();   //close the connection
        })
    })

    //redirect to root
    res.redirect("/");
})

//updating course
app.get("/update",(req,res)=> {
    res.sendFile(__dirname+"/update.html");
})
app.post("/updateCourse", (req,res)=>{
    let id = eval(req.body.id);
    let amount = eval(req.body.amount);
//   update the data in mongoDB
    obj.Promise = global.Promise;
    let url = "mongodb://localhost:27017/meanstack";
    const mongooseDbOption = {  //to avoid warning
            useNewUrlParser: true,
            useUnifiedTopology: true
    }
    obj.connect(url, mongooseDbOption);  //ready to connect
    let db = obj.connection;  //connected to database
    db.on("error",(err)=>console.log(err));
    db.once("open",()=>{
        //creating reference using model
        Course.updateOne({_id:id},{$set:{camount:amount}},(err,result)=>{
            if(!err){
                // console.log(result);
                //console.log("Record deleted successfully "+result);
                if(result.nModified>0){
                    console.log("record updated");
                }else{
                    console.log("Record not updated");
                }
            }
            obj.disconnect();
        })
    })

    //redirect to root
    res.redirect("/");
})

//Delete course
app.get("/delete",(req,res)=> {
    res.sendFile(__dirname+"/delete.html");
})
app.post("/deleteCourse", (req,res)=>{
    let id = eval(req.body.id);
//   delete the data in mongoDB
    obj.Promise = global.Promise;
    let url = "mongodb://localhost:27017/meanstack";
    const mongooseDbOption = {  //to avoid warning
            useNewUrlParser: true,
            useUnifiedTopology: true
    }
    obj.connect(url, mongooseDbOption);  //ready to connect
    let db = obj.connection;  //connected to database
    db.on("error",(err)=>console.log(err));
    db.once("open",()=>{
        //creating reference using model
        Course.deleteOne({_id:id},(err,result)=>{
            if(!err){
                //console.log("Record deleted successfully "+result);
                if(result.deletedCount>0){
                    console.log("record deleted");
                }else{
                    console.log("Record not present");
                }
            }
            obj.disconnect();
        })
    })

    //redirect to root
    res.redirect("/");
})

//Fetch Course from mongoDB
app.get("/fetch",(req,res)=> {
    let coursesArray = new Array();
    //   update the data in mongoDB
    obj.Promise = global.Promise;
    let url = "mongodb://localhost:27017/meanstack";
    const mongooseDbOption = {  //to avoid warning
            useNewUrlParser: true,
            useUnifiedTopology: true
    }
    obj.connect(url, mongooseDbOption);  //ready to connect
    let db = obj.connection;  //connected to database
    db.on("error",(err)=>console.log(err));
    db.once("open",()=>{
        //creating reference using model
        //res.send("<h1>List of Courses</h1></br>");
        Course.find({},(err,result)=>{
            if(!err){
                res.json(result);
                //console.log(result);
                // result.forEach(doc=>coursesArray.push(doc));
            }
            else{
               // redirect to root
                res.redirect("/");
            }
            obj.disconnect();
        })
    })
    
    //redirect to root
    //res.redirect("/");
})

//start server
app.listen(port, ()=>console.log(`Server running on port number ${port}`));
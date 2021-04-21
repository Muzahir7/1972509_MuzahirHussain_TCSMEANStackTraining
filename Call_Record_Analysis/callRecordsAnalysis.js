let fs = require("fs");
let data = fs.readFileSync("call_data.json");
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"

//retriving from json
let jsonString = data.toString();
let records= JSON.parse(jsonString);

//console.log(records);

mongoClient.connect(url, { useUnifiedTopology: true }, (err1,client)=>{
    if(!err1){
        let db = client.db("meanstack");
        db.collection("CallRecords").insertMany(records,(err2,result)=>{
            if(!err2){
                console.log(result.insertedCount);
            }else{
                console.log(err2);
            }
            client.close();
        })
    }
});

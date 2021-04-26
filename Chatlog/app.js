let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/chatPage.html");
})

io.on("connection",(socket)=>{
    socket.on("chat",(obj)=> {
        console.log(obj);
        mongoClient.connect(url, { useUnifiedTopology: true }, (err1,client)=>{
            if(!err1){
                let db = client.db("meanstack");
                db.collection("ChatLog").insertOne(obj,(err2,result)=>{
                    if(!err2){
                        console.log(result.insertedCount);
                    }else{
                        console.log(err2);
                    }
                    client.close();
                })
            }
        });
    })
})


http.listen(9090,()=>console.log(`server running on port number 9090`));
const express=require('express');
const app=express();
const cors=require('cors');
app.use (express.json());
app.use (cors());


const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_react'
});
//connect DB

conn.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log('Connected to database')
    }
});


//post method
app.post("/get/tasks",(req,res)=>{
    const{id,tsks}=req.body;


    conn.query("insert into todo_tasks(tsks) values(?)",[tsks],
    (err)=>{
        if(err)
       res.json(err)
        else
        console.log("data inserted successfully")
        res.json({message:"data inserted successfully"})

    })
});
//get method
app.get("/get/tasks",(req,res)=>{

    conn.query("SELECT * FROM todo_tasks;",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result);
        }
    });

})
//delete method
app.delete("/get/tasks/:id",(req,res)=>{
    const id= req.params.id;

    conn.query("delete from todo_tasks where id=?",[id],(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json("Data Deleted Successfully");
        }
    });

})

//starting the server
app.listen(5000,()=>{
    console.log("server is listening at port 5000");
});



const crypto = require('crypto');
const bcrypt = require('bcrypt')
const express = require('express');
const bodyparser = require('body-parser');
const url = require('url');
const app = express();
const cors = require('cors')
app.use(cors({
    origin:"*"
}))
require('dotenv').config();
let sql;
const Auth_Pass= process.env.AUTH_PSSW

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./message.db', sqlite.OPEN_READwRITE,(err) =>{
    if(err) return console.log(err)
    })

function psswCheck(pssw){
    bcrypt.compare(pssw,Auth_Pass,function(err,result){
        console.log(result)
        return result
    })
}

app.use(bodyparser.json());
/*   app.use(express.static('/home/fcssp/webapp/tweener/tweener1/dist'))   */

app.post("/message",(req,res)=>{
    try{
        console.log(req.body)
        const { nome ,cognome , telefono , email , paese ,provincia } = req.body;
        sql="INSERT INTO fromclient(nome ,cognome , telefono , email , paese ,provincia) VALUES(?,?,?,?,?,?)"
        db.run(sql,[nome ,cognome , telefono , email , paese ,provincia],(err)=>{
            if(err) return res.json({
                status: 300,
                success: false,
                error : err
            })
            console.log("data recived",nome ,cognome , telefono , email , paese ,provincia )
        })
        return res.json({
            status : 200 ,
            success : true
        });
    } catch(error){
        return res.json({
            status: 400,
            success: false
        })
    }
})
app.post("/deleteall",(req,res)=>{
    sql= "DELETE FROM fromclient";
    
    if(!req.headers.hasOwnProperty('tweener-auth') ) 
        return res.json({
            status: 500,
            success: false,
            error : "Not allowed"
        });

    
    let pssw = req.headers['tweener-auth']
    if(psswCheck(pssw) === false){ return res.json({
        status: 500,
        success: false,
        error : "Not allowed"
    });}
    else{
        try{db.run(sql)
            return res.json({
                status: 200,
                success: true,
                error : "Table records deleted"
            });    }
        catch(err){

        }}
        }
        )

app.post("/api",(req,res)=>{
    sql= "SELECT * FROM fromclient";
    let pssw = req.headers['tweener-auth']
    if(psswCheck(pssw) === false){ return res.json({
        status: 500,
        success: false,
        error : "Not allowed"
    });}
    else{
          
    try{
     
        db.all(sql,[],(err,rows)=>{
            if(err)return res.json({
                status: 300,
                success: false,
                error : err
            });
            if(rows.length < 1 )return res.json({
                status: 300,
                success: false,
                error : "No results"
            });
            return res.json({
                status: 200,
                data: rows ,
                success: true
            })
        })

    }catch(error){

    }
    }
  
})



app.listen(3000);
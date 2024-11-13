const { response } = require('express');
const crypto = require('crypto')
/*
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./message.db', sqlite.OPEN_READwRITE,(err) =>{
    if(err) return console.log(err)
    })
const sql = 'SELECT * FROM fromclient'
/*
'CREATE TABLE fromclient(ID INTEGER PRIMARY KEY , nome ,cognome,telefono , email,paese, provincia)'
db.run(sql)   

db.all(sql,[],(err,rows)=>{
console.log(rows)
})
*/
pssw = "GigiChessBoss"
function sha256(content){
    return crypto.createHash('sha256').update(content).digest('hex');
}

console.log(sha256(pssw))
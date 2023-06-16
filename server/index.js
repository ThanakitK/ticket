const express = require("express");

const app = express();
const mysql = require('mysql');
const cors = require('cors');


app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database: "ticketSystem"
})

app.get('/ticket', (req, res) =>{
    db.query("SELECT * FROM ticket", (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.post('/create', (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;
    const status = req.body.status;
    const create_at = req.body.create;
    const update_at = req.body.update;

    db.query("INSERT INTO ticket (title, description, contact, status, create_at, update_at) VALUES(?,?,?,?,?)", [title, description, contact, status, create_at, update_at],
    (err, result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send("Value inserted")
        }
    })
})

app.listen('3001', () =>{
    console.log('Server is running on port 3001');
})
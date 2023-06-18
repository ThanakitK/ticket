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

app.get('/ticket/status', (req, res) =>{
    db.query("SELECT * FROM ticket ORDER BY status", (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/ticket/update', (req, res) =>{
    db.query("SELECT * FROM ticket ORDER BY update_at DESC", (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.post('/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;
    const status = "pending";
    const create_at = new Date();
    const update_at = new Date();
    db.query("INSERT INTO ticket (title, description, contact, status, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?)", [title, description, contact, status, create_at, update_at],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error inserting ticket");
        } else {
          res.send("Ticket inserted successfully");
        }
      }
    );
});

app.put('/update', (req, res)=>{
    const id = req.body.id+1;
    const contact = req.body.contact;
    const status = req.body.status;
    const update_at = new Date();
    db.query("UPDATE ticket SET contact = ?, status = ?, update_at = ? WHERE id = ?", [contact, status, update_at, id], (err)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Value update");
        }
    })
})
app.listen('3001', () =>{
    console.log('Server is running on port 3001');
})
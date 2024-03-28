import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 3000;

//Connection mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gowsi@123'
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to Mysql server!");
    connection.query("CREATE DATABASE IF NOT EXISTS banking", function (err, res) {
        if (err) throw err;
        console.log("Database Created");
    })
    connection.query("USE banking");
    const createtable = "create table IF NOT EXISTS customers (id int auto_increment PRIMARY KEY, name VARCHAR(30), ac_no VARCHAR(30), customer_id VARCHAR(30), password VARCHAR(20), ph_no VARCHAR(12), branch VARCHAR(20), ifsc_code VARCHAR(20), card_no VARCHAR(30), card_type VARCHAR(20), beneficiary_ac VARCHAR(30), saving_balance INT(20), current_balance INT(20), credit_balance INT(20))";
    connection.query(createtable, function (err, res) {
        if (err) throw err;
        console.log("Table Created Successfully");
    })
})

app.get("/aj", (req, res) => {
    res.send("Hi from Express!");
});

//signup
app.post('/sign_up', (req, res) => {
    console.log("sign up", req.body);
    const username = req.body.username;
    const ac_no = req.body.acno;
    const customer_id = req.body.customerid;
    const password = req.body.password;
    const ph_no = req.body.phno;
    const branch = req.body.branch;
    const ifsc_code = req.body.ifsc_code;
    const card_no = req.body.card_no;
    const card_type = req.body.card_type;
    const beneficiary_ac = req.body.beneficiary_ac;
    const balance = 0;

    console.log("Customer", ph_no);

    console.log("Checking data");

    const insertquery = `INSERT INTO customers(name, ac_no, customer_id, password, ph_no, branch, ifsc_code, card_no, card_type, beneficiary_ac, saving_balance, current_balance, credit_balance) VALUES (?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?)`;
    const value = [username, ac_no, customer_id, password, ph_no, branch, ifsc_code, card_no, card_type, beneficiary_ac, balance, balance, balance];

    connection.query(insertquery, value, (queryError) => {
        if (queryError) {
            console.log(queryError);
            res.send("0");
        }
        else {
            console.log("Inserted successfully");
            res.send("1");
        }
    })
})

//login
app.post('/login', (req, res) => {
    console.log("Login backend", req.body);

    const customer_id = req.body.customerid;
    const password = req.body.password;

    if (customer_id && password) {
        console.log("Login checking");
        connection.query("SELECT * FROM customers WHERE customer_id = ? AND password = ?", [customer_id, password], function (err, response, fields) {
            if (err) throw err;
            if (response.length > 0) {
                console.log("Login success");
                res.send("1");
            }
            else {
                console.log("Login failed");
                res.send("0");
            }
        });
    }
});

//dashboard
app.post('/dashboard', (req, res) => {
    console.log("Backend dashboard");
    console.log(req.body);

    const customer_id = req.body.customerid;

    connection.query("SELECT * FROM customers WHERE customer_id = ?", [customer_id], function (err, response, fields) {

        if (err) throw err;
        if (response.length > 0) {
            console.log("Select response", response)
            res.json(response);
        }

    })
})


//Transfer
app.post('/transaction', (req, res) => {
    console.log("Transfer", req.body);
})

//server port
app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
})
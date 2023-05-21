const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Shubham@1234",
    database:"my-task2"
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/api/get",(req,res) => {
    const sqlGet = "SELECT * FROM product"
    db.query(sqlGet,(error,result) => {
        res.send(result);
    })
})
app.post("/api/post",(req,res) => {
    const {product_name,product_price,product_description,product_category} = req.body;
    const sqlInsert = "INSERT INTO product (product_name,product_price,product_description,product_category) VALUES (?,?,?,?)"
    db.query(sqlInsert,[product_name,product_price,product_description,product_category],(error,result) => {
        if(error){
            console.log(error);
            res.status(500).send("Error inserting data into the database");
            return;
        }
        
        res.send("Data inserted successfully");
    });
});

app.delete("/api/remove/:id",(req,res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM product WHERE id = ?"
    db.query(sqlRemove,[id],(error,result) => {
        if(error){
            console.log(error);
        }
    })

})
app.get("/api/get/:id",(req,res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM product WHERE id = ?"
    db.query(sqlGet,id,(error,result) => {
        res.send(result);
    })
})
app.put("/api/update/:id",(req,res) => {
    const {id} = req.params;
    const {product_name,product_price,product_description,product_category} = req.body;
    const sqlUpdate = "UPDATE product SET product_name = ?, product_price = ?, product_description = ?, product_category = ? WHERE id = ?"
    db.query(sqlUpdate, [product_name,product_price,product_description,product_category,id],(error,result) => {
        res.send(result);
    })
})
app.listen(3005,() => {
    console.log("Server is running on port 3005")
})
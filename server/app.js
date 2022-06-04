// importing packages or assets
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user = require("./models/schema");
const cors = require("cors")
const router = require("./routes/router");

require("./DB/connection");

// creating express app
const app = express();

// using a middleware for cors, json format and router
app.use(express.json());
app.use(router);
app.use(cors({
  origin:"https://vermillion-meringue-9fb598.netlify.app"
}));
// as i used env file to store private data like port number, here i am giving path or that
// file and then assigning it to a variable
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
  res.json("SERVER STARTED");
})

// here i am making the server listen
app.listen(PORT, () => {
  console.log(`SERVER IS STARTED ON http://localhost:${PORT}`);
});

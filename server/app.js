// importing packages or assets
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user = require("./models/schema");
const cors = require("cors")
const router = require("./routes/router");
const axios =require("axios");

require("./DB/connection");

// creating express app
const app = express();

// using a middleware for cors, json format and router
app.use(cors({
  origin:'https://preeminent-stardust-f1af75.netlify.app'
}));
app.use(express.json());
app.use(router);




app.get("/", (req,res)=>{
  res.json("SERVER STARTED");
})
// app.get("/", async (req, res) => {
// 	try {axios({
//   method: 'get',
//   url: 'https://cors-anywhere.herokuapp.com/https://studentcrudmern.herokuapp.com',
//   headers: {'Origin': 'https://studentcrudmern.herokuapp.com'}
// }))
// 		res.status(200).json(response.data);
// 	} catch (err) {
// 		res.status(500).json({ message: err });
// 	}
// });

// as i used env file to store private data like port number, here i am giving path or that
// file and then assigning it to a variable
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;


// here i am making the server listen
app.listen(PORT, () => {
  console.log(`SERVER IS STARTED ON http://localhost:${PORT}`);
});

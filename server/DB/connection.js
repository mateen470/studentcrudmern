const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

// databse link
const DB = process.env.MONGO;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGODB connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

const { Router } = require("express");
const express = require("express");
const router = express.Router();
const user = require("../models/schema");

// API WHICH IS USING POST METHOD TO ADD THE USER IN THE DATA BASE
router.post("/add", async (req, res) => {
  const { name, id, department, semester, email } = req.body;

  //   IF THE DATA IS EMPTY
  if (!name || !id || !department || !semester || !email) {
    res.status(422).json("KINDLY FILL THE FORM COMPLETELY");
  }

  //   USING PROMISING METHOD TO FIRSTLY VALIDATE THAT IS THE DATA ALREADY  EXIST BY COMPARING THE id
  try {
    const exist = await user.findOne({ id: id });
    console.log(exist);

    if (exist) {
      res.status(422).json("THE USER ALREADY EXIST");
    }
    // HERE NOW THE DATA IS BEING ADDED IN DATA BASE AFTER IT HAS BEEN VALIDATED
    else {
      const addUser = new user({
        name,
        id,
        department,
        semester,
        email,
      });

      await addUser.save();
      res.status(201).json(addUser);
      console.log(addUser);
    }
  } catch (error) {
    res.status(422).send(error);
  }
});

// THIS API IS TO SHOW OR VIEW ALL OF THE DATA SAVED IN THE DATABASE BY USING GET METHOD
router.get("/show", async (req, res) => {
  try {
    //   HERE ALL THE DATA IS BEING STORED IN userData
    const userData = await user.find();
    // HERE ALL THE DATA IS BEING SENT TO FRINT END IN JSON FORMAT
    res.status(201).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(422).send(error);
  }
});

// THIS API IS USING GET METHOD TO FINDING A USER AGAINST IT'S ID AND THEN SENDING IT TO FRONT END
router.get("/view/:id", async (req, res) => {
  try {
    //    REQUESTING ID THAT WILL BE PROVIDED BY HOME PAGE WHEN VIEW BUTTON WILL BE CLICKED
    const { id } = req.params;
    // FETCHING THE DATA AGAINST THE ID AND SENDING IT BACK TO VIEW PAGE
    const singleView = await user.findById({ _id: id });
    res.status(201).json(singleView);
  } catch (error) {
    res.status(422).send(error);
  }
});

// THIS API IS USING PATCH METHOD TO UPDATE THE DATA AND WE ARE NOT USING THE PUT METHOD BECAUSE PIT METHOD WILL UPDATE ALL
// THE RECORDS BUT THE PATCH WILL UPDATE ONLY THE SPECIIFED
router.put("/update/:id", async(req, res) => {
    
  console.log(req.params)
  try {
        const {id} = req.params;

        const updateduser = await user.findOneAndUpdate( {id},req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);


    } catch (error) {
      console.log(error)
        res.status(422).json(error);
    }
})

// THIS API IS FOR DELETE FUNCTION AND IT WILL DELETE THE USER SPECIFIC TO GIVEN ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deluser = await user.findOneAndDelete({ _id: id });
    res.status(201).json(deluser);
  } catch (error) {
    res.status(422).send(error);
  }
});

module.exports = router;

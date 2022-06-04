// THIS REGISTERATION PAGE OF A NEW STUDENT
import { useState } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Add = () => {
  // THIS useNavigate HOOK IS USED WHEN YOU WILL CLICK ON SUBMIT BUTTON, THE PAGE WILL GO BACK TO
  // WHEREEVER YOU PUT ADDRESS IN THIS HOOK TO
  const goBack = useNavigate();
  // USING STATE HOOK FOR THE VALUES OF THE INPUT VARIABLES
  const [val, setINP] = useState({
    name: "",
    id: "",
    department: "",
    semester: "",
    email: "",
  });

  // setData FUNCTION TO GET THE VALUES WHIHC WILL BE PROVIDED BY USER
  const setData = (e) => {
    const { name, value } = e.target;
    setINP((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // THIS IS addData FUNCTION WHICH IS BASICALLY TAKING INPUT THAT IS PROVIDED
  // BY THE USER ON THE FRONT END (ADD-USER PAGE) AND THEN PERFORMING DATA
  // VALIDATION ON IT AND THEN IT IS SENDING IT TO BACKEND
  const addData = async (e) => {
    e.preventDefault();
    // HERE IS HAVE USED THE USESTATE VALUE val TO DEFINE ALL THE VARIABLES TO GET THE DATA ENTERED BY USER
    const { name, id, department, semester, email } = val;

    // HERE FETCH METHOD IS BEING USED AND WE ARE USING POST METHOD T9 SEND DATA BACK TO SERVER
    const res = await fetch("https://studentcrudmern.herokuapp.com/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        id,
        department,
        semester,
        email,
      }),
    });

    const data = await res.json();
    console.log(data);

    //IF DATA IS EMPTY
    if (res.status === 422 || !data) {
      alert("ERROR");
      console.log("ERROR");
    }
    // IF DATA IS FILLED PROPERLY
    else {
      alert("DATA ADDED SUCCESSFULLY!");
      // THIS IS A useNavigate HOOK VARIABLE SO THE PAGE WILL GO BACK TO HOME PAGE
      goBack("/");
    }
  };

  return (
    <>
      <div className="mb-2" id="main">
        <div>
          <NavLink className="newUser" to="/">
            <span>
              <i className="fas fa-angle-double-left" aria-hidden="true"></i>
              All Users<i className="fa fa-user" aria-hidden="true"></i>
            </span>
          </NavLink>
        </div>
        <div className="text-center">
          <h2 className="addText">New User</h2>
          <span className="fs-5">fill the form below to add a new student</span>
        </div>
      </div>
      <form>
        <div className="input form-group bg-dark d-inline-block text-white mt-4">
          <div className="second">
            <div className="m-2 fs-5">
              <label htmlFor="name">
                NAME :
                <input
                  type="text"
                  id="Name"
                  className="text"
                  placeholder="Abdul Mateen"
                  name="name"
                  value={val.name}
                  onChange={setData}
                />
              </label>
            </div>
            <div className="m-2 fs-5">
              <label htmlFor="id">
                ID :
                <input
                  type="text"
                  id="id"
                  className="text"
                  placeholder="FA19-BCS-022"
                  name="id"
                  value={val.id}
                  onChange={setData}
                />
              </label>
            </div>
            <div className="m-2 fs-5">
              <label htmlFor="dep">
                DEPARTMENT :
                <input
                  type="text"
                  id="dep"
                  className="text"
                  placeholder="CS"
                  name="department"
                  value={val.department}
                  onChange={setData}
                />
              </label>
            </div>
            <div className="m-2 fs-5">
              <label htmlFor="sem">
                SEMESTER :
                <input
                  type="number"
                  id="sem"
                  className="number"
                  placeholder="6"
                  name="semester"
                  value={val.semester}
                  onChange={setData}
                />
              </label>
            </div>
            <div className="m-2 fs-5">
              <label htmlFor="email">
                E-MAIL :
                <input
                  type="email"
                  id="email"
                  className="email"
                  placeholder="FA19-BCS-022@cui.com"
                  name="email"
                  value={val.email}
                  onChange={setData}
                />
              </label>
            </div>
            <button
              type="submit"
              onClick={addData}
              className="btn btn-secondary d-grid gap-2 col-6 mx-auto"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

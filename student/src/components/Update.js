// THIS REGISTERATION PAGE OF A NEW STUDENT
import { useState, useEffect } from "react";
import React from "react";

import { NavLink, useParams, useNavigate } from "react-router-dom";

export const Update = () => {
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
  let { id } = useParams("");

  // THIS FUNCTION WILL VALIDATE AND THEN STORE THE WHOLE DATA AGAINST THE ID IN setINP RATHER THAN getUser AS IN ADD PAGE
  // BECAUSE WE WANT TO SHOW THE DATA IN THE FORM WHICH IS ALREADY EXISTING AND SETINP
  // ALREADY HAS THAT PREVIOUS DATA STORED
  const Update = async () => {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://studentcrudmern.herokuapp.com/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // STORING THE DATA WHICH IS SENT BY THE SERVER IN JSON FORMAT IN data
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("ERROR");
    } else {
      // THE setUser IS THE VARIABLE DEFINED IN USESTATE TO UPDATE OR STORE THE NEW VALUE, data IS BEING TO THE setUser
      setINP(data);
    }
  };
  useEffect(() => {
    Update();
  }, []);

  // THIS FUNCTION IS AN ONCLICK FUNCTION OF UPDATE BUTTON AND IT WILL UPDATE THE RECORD AND IT ALSO SPECIFIES THE
  // DATA BASED ON THE ID AND HOW IT WORKS IS THAT THE SERVER WILL GET THE ID FROM HOME PAGE AND THE  THE SERVER
  // WILL FIND THE WHILE DATA AGAINST THAT ID AND THEN SEND THE WHOLE DATA TO THIS FUNCTION
  const updateUser = async (e) => {
    e.preventDefault();

    const { name, id, department, semester, email } = val;
    
    const res2 = await fetch(`https://cors-anywhere.herokuapp.com/https://studentcrudmern.herokuapp.com/update/${id}`, {
      method: "PUT",
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

    const data2 = await res2.json();

    if (res2.status === 422 || !data2) {
      alert("ERROR");
    } else {
      alert("DATA UPDATED SUCCESSFULLY!");
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
          <h2 className="addText">Update User</h2>
          <span className="fs-5">
            fill the form below to update the student
          </span>
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
              onClick={updateUser}
              className="btn btn-secondary d-grid gap-2 col-6 mx-auto"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );}

// THIS IS HOME PAGE AND IT WILL SHOW THE TABLE OF ALL THE CONTENTS WHICH YOU CAN CHANGE
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const Home = () => {
  // USING USESTATE TO GET AND SET THE DATA WHICH WILL BE PROVIDED BY DATABASE TO DISPLAY ON HOME PAGE
  const [getUser, setUser] = useState([]);

  // ASYNC getData FUNCTION WITH GET METHOD TO VALIDATE AND SHOW THE DATA ON HOME PAGE
  const getData = async (e) => {
    const res = await fetch("https://studentm.herokuapp.com/show", {
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
      setUser(data);
    }
  };
  // USEEFFECT FUNCTION IS BUILT-IN FUNCTION OF REACT WHIHC WILL BE EXECUTED EVERYTIME THE PAGE IS LOADED
  useEffect(() => {
    // CALLING THE getData FUNCTION IN USEEFFECT FUNCTION
    getData();
  }, []);

  const delUser = async (id) => {
    const res2 = await fetch(`https://studentm.herokuapp.com/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deldata = await res2.json();
    console.log(deldata);

    if (res2.status === 422 || !deldata) {
      alert("ERROR");
    } else {
      // THE setUser IS THE VARIABLE DEFINED IN USESTATE TO UPDATE OR STORE THE NEW VALUE, data IS BEING TO THE setUser
      alert("DELETED SUCCESSFULLY!");
      getData();
    }
  };

  return (
    <>
      <div className="screen">
        <div>
          <NavLink className="newUser" to="/add">
            Add User<i className="fa fa-user" aria-hidden="true"></i>
          </NavLink>
        </div>
        <table className=" table table-striped table-hover">
          <thead className="bg-secondary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">ID.</th>
              <th scope="col">DEPARTMENT</th>
              <th scope="col">SEMESTER</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* USING MAP FUNCTION TO ITEREATE ALL THE VALUES STORED IN getUser TO SHOW AT HOME PAGE */}
            {getUser.map((element, i) => {
              return (
                <>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.id}</td>
                    <td>{element.department}</td>
                    <td>{element.semester}</td>
                    <td>{element.email}</td>
                    <td>
                      {/* GETTING THE ID AND THEN SENDING IT TO SERVER IF SERVER USES req.params OR VIEW PAGE BY useParams*/}
                      <NavLink to={`/view/${element._id}`}>
                        <button type="button" className="btn btn-dark m-1">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </NavLink>
                      <NavLink to={`/update/${element._id}`}>
                        <button type="button" className="btn btn-secondary">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </NavLink>

                      <button
                        type="button"
                        className="btn btn-light m-1"
                        onClick={()=>delUser(element._id)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

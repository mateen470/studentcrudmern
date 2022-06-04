// THIS IS A VIEW PAGE WHICH WILL SHOW YOU ALL THE CONTENTS OF THE STUDENT YOU DESIRE TO VIEW
import React, { useEffect, useState} from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export const View = () => {
  const goBack = useNavigate();

  // GETTING ID FROM HOME PAGE
  const { id } = useParams("");

  const [getUser, setUser] = useState([]);
  // THIS FUNCTION WILL VALIDATE AND THEN STORE THE WHOLE DATA AGAINST THE ID IN getUser
  const single = async () => {
    const res = await fetch(`https://studentcrudmern.herokuapp.com/view/${id}`, {
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
  useEffect(() => {
    single();
  }, []);

  // THIS FUNCTION IS BASICALLY TO DELETE THE USER
  const delUser = async (id) => {
    const res2 = await fetch(`https://studentcrudmern.herokuapp.com/delete/${id}`, {
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
      alert("DELETED SUCCESSFULLY!");
      goBack("/");
    }
  };

  return (
    <>
      <NavLink className="newUser" to="/">
        <span>
          <i className="fas fa-angle-double-left" aria-hidden="true"></i>
          All Users<i className="fa fa-user" aria-hidden="true"></i>
        </span>
      </NavLink>
      <div className="card text-center bg-secondary mb-4">
        <div className="card-body">
          <h1 className="card-title viewH3">{getUser.name}</h1>
          <hr></hr>
          <NavLink to={`/update/${getUser._id}`}>
            <button type="button" className="btn btn-dark">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </NavLink>
          <NavLink to="#">
            <button
              type="button"
              className="btn btn-dark m-1"
              onClick={() => delUser(getUser._id)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </NavLink>
        </div>

        <ul className="list-group list-group-flush mx-1 my-1">
          <li className="list-group-item ">
            <h3 className="viewH3">ID</h3>
            <h4>{getUser.id}</h4>
          </li>
          <li className="list-group-item">
            <h3 className="viewH3">DEPARTMENT</h3>
            <h4>{getUser.department}</h4>
          </li>
          <li className="list-group-item ">
            <h3 className="viewH3">SEMESTER</h3>
            <h4>{getUser.semester}</h4>
          </li>
          <li className="list-group-item ">
            <h3 className="viewH3">EMAIL</h3>
            <h4>{getUser.email}</h4>
          </li>
        </ul>
      </div>
    </>
  );
};

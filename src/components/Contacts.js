import React, { useState, useEffect } from "react";
import Contactform from "./Contactform";
import firebaseDb from "../firebase";
import { toast } from "react-toastify";

const Contacts = () => {
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(contactObjects));
  }, [contactObjects]);

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setContactObjects({
          ...snapshot.val(),
        });
      } else setContactObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId == "")
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record")) {
      firebaseDb.child(`contacts/${key}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted Successfully");
        }
        // } setCurrentId("");
      });
    }
  };

  window.addEventListener("online", changeStatus);
  window.addEventListener("offline", changeStatus);

  function changeStatus(ev) {
    document.getElementById("status").textContent = ev.type.toUpperCase();
    // if (ev.type == "online") {
    //   setCurrentId("");
    // } else {
    //   setCurrentId([0]);
    // }
  }

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Register</h1>
          <h1 className="display-4 text-center">
            You are currently <span id="status">UNKNOWN</span>
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Contactform {...{ addOrEdit, currentId, contactObjects }} />
        </div>
        <div className="col-md-6">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{contactObjects[id].fullname}</td>
                    <td>{contactObjects[id].mobile}</td>
                    <td>{contactObjects[id].email}</td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => {
                          onDelete(id);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;

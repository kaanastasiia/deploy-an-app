import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";

const User = props => {
  const initialUserState = {
    id: null,
    firstname: "",
    lastname: "",
    email: ""
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User {currentUser.id}</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={currentUser.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={currentUser.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
            
          </form>
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateUser}
          >
            Update
          </button>
          <br/>
          <br/>
          <button className="btn btn-danger" onClick={deleteUser}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;

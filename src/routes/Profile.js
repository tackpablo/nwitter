import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import { updateProfile } from "@firebase/auth";
// import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName || "User"
  );
  const navigate = useNavigate();

  // Handler for logging out user
  const logoutHandler = () => {
    authService.signOut();
    navigate("/");
  };

  // Handler for profile name input value change
  const onChangeHandler = (event) => {
    // destructure based on the target's value, same as event.target.value
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  // Handler for updating profile name
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      navigate("/");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={onSubmitHandler} className="profileForm">
          <input
            type="text"
            placeholder="Display name"
            onChange={onChangeHandler}
            value={newDisplayName}
            autoFocus
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={logoutHandler}>
          Log Out
        </span>
      </div>
    </>
  );
};

export default Profile;

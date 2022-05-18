import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName || "User"
  );
  const navigate = useNavigate();

  // Handler for logging out user
  const logoutHandler = () => {
    authService.signOut();
    navigate("/");
  };

  // function to get nweets for logged in user, not used
  const getMyNweets = async () => {
    // create a query against a collection, specify ordering and for logged in user
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", userObj.uid)
    );

    // event listener for any changes (add, delete, update, etc) to database query which updates our nweets
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChangeHandler = (event) => {
    // destructure based on the target's value, same as event.target.value
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChangeHandler}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Profile;

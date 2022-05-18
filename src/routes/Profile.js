import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();

  // Handler for logging out user
  const logoutHandler = () => {
    authService.signOut();
    navigate("/");
  };

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

  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Profile;

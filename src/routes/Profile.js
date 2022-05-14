import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";

const Profile = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Profile;

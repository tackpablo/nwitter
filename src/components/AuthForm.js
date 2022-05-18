import React, { useState } from "react";
import "firebase/auth";
import { authService } from "../fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  // Handler for login input value changes
  const onChangeHandler = (event) => {
    // destructure based on the target's name and value, same as event.target.name and event.target.value
    const {
      target: { name, value },
    } = event;

    // depending on the target's name, set the state
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handler for submission of nweet to make request to firebase either to login or register a user
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let data;

      if (newAccount) {
        // create new account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // login
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      // console.log("DATA: ", data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handler for toggling between signup or login form
  const toggleAccountHandler = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChangeHandler}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChangeHandler}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Login"}
          required
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccountHandler} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;

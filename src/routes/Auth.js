import React, { useState } from "react";
import "firebase/auth";
import { authService } from "fbase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    // destructure based on the target's name and value
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
      console.log("DATA: ", data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChangeHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChangeHandler}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Login"}
          required
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;

import React, { useState } from "react";
import "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    console.log(event.target);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          name="email"
          type="text"
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
        <input type="submit" value="Login" required />
      </form>
      <button>Continue with Google</button>
      <button>Continue with Github</button>
    </div>
  );
};

export default Auth;

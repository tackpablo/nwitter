import React from "react";
import "firebase/auth";
import { authService } from "../fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const SocialLoginForm = () => {
  // Handler for toggling between google or github login
  const onSocialClickHandler = async (event) => {
    // destructure based on the target's name, same as event.target.name
    const {
      target: { name },
    } = event;

    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
    console.log("DATA: ", data);
  };

  return (
    <div>
      <button onClick={onSocialClickHandler} name="google">
        Continue with Google
      </button>
      <button onClick={onSocialClickHandler} name="github">
        Continue with Github
      </button>
    </div>
  );
};

export default SocialLoginForm;

import React from "react";
import "firebase/auth";
import { authService } from "../fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

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

    await signInWithPopup(authService, provider);
    // console.log("DATA: ", data);
  };

  return (
    <div className="authBtns">
      <button onClick={onSocialClickHandler} name="google" className="authBtn">
        Continue with Google <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button onClick={onSocialClickHandler} name="github" className="authBtn">
        Continue with Github <FontAwesomeIcon icon={faGithub} />
      </button>
    </div>
  );
};

export default SocialLoginForm;

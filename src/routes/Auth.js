import React from "react";
import AuthForm from "../components/AuthForm";
import SocialLoginForm from "../components/SocialLoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <SocialLoginForm />
    </div>
  );
};

export default Auth;

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul className="ulList">
        <li>
          <Link
            to="/"
            style={{
              marginRight: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "1em",
            }}
          >
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" />
            <span style={{ marginTop: 10 }}>Nweets</span>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "1em",
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="3x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${
                    userObj.displayName ? userObj.displayName : "User"
                  }'s Profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

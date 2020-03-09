import React from "react";
import Tilt from "react-tilt";
import "../logo/Logo";
import icon from "../logo/icon.png";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="ma4">
          <Tilt
            className="Tilt br2 shadow-2"
            options={{ max: 65 }}
            style={{ height: 150, width: 150 }}
          >
            <div className="Tilt-inner pa3">
              <img src={icon} alt="logo"></img>
            </div>
          </Tilt>
        </div>
        <p
          className="f3 link dim  underline pa3 pointer"
          onClick={() => onRouteChange("signout")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim  underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="f3 link dim  underline pa3 pointer"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;

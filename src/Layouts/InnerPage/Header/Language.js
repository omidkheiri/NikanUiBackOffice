import React, { useState } from "react";
import classes from "./Language.module.css";
import i18n from "../../../i18n";
import { Helmet } from "react-helmet";
const Language = () => {
  const [currentLang, setCurrentLang] = useState("fa");
  const [direction, setDirection] = useState("rtl");

  const updateCurrentLang = () => {
    if (currentLang === "fa") {
      setCurrentLang("en");
    } else {
      setCurrentLang("fa");
    }

    i18n.changeLanguage(currentLang);
    setDirection(currentLang === "fa" ? "rtl" : "ltr");
  };
  return (
    <li className="nav-item dropdown message-dropdown">
      <Helmet htmlAttributes={{ lang: currentLang, dir: direction }} />
      <div
        className="nav-link dropdown-toggle user"
        id="user-profile-dropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="media">
          <img
            src={require("../../../assets/img/" + currentLang + ".png")}
            className={classes.media + " img-fluid"}
            alt="admin-profile"
            onClick={updateCurrentLang}
          />
        </div>
      </div>
    </li>
  );
};

export default Language;

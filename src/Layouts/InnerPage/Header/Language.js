import React, { useState } from "react";
import classes from "./Language.module.css";
import i18n from "../../../i18n";

const Language = () => {
  const [currentLang, setCurrentLang] = useState("fa");
  const updateCurrentLang = () => {
    if (currentLang == "fa") {
      setCurrentLang("en");
    } else {
      setCurrentLang("fa");
    }

    i18n.changeLanguage(currentLang);
  };
  return (
    <li className="nav-item dropdown message-dropdown">
      <a
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
      </a>
    </li>
  );
};

export default Language;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProfielMenu = () => {
  const [t, i18n] = useTranslation("common");
  const [showProfileMenu, setShowMenu] = useState("");
  const [profielInnerMenu, setProfielInnerMenu] = useState("");
  const showProfielMenu = () => {
    if (showProfileMenu === "") {
      setShowMenu(" show");
      setProfielInnerMenu(" show");
    } else {
      setShowMenu("");
      setProfielInnerMenu("");
    }
  };

  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
    },
  };

  return (
    <li
      className={
        " nav-item  dropdown user-profile-dropdown  order-lg-0 order-1" +
        showProfileMenu
      }
    >
      <Link
        to="/"
        className="nav-link dropdown-toggle user"
        id="user-profile-dropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="media">
          <img
            onClick={showProfielMenu}
            src={require("../../../assets/img/user.png")}
            className="img-fluid"
            alt="admin-profile"
          />
        </div>
      </Link>
      <div
        style={styles.textAlign}
        className={"dropdown-menu position-absolute " + profielInnerMenu}
        aria-labelledby="userProfileDropdown"
      >
        <div className="user-profile-section">
          <div className="media mx-auto">
            <div className="media-body">
              <h5>User Name</h5>
              <p>Role</p>
            </div>
          </div>
        </div>
        <div className="dropdown-item">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Profile</span>
          </Link>
        </div>
        <div className="dropdown-item">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="feather feather-inbox"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            </svg>
            <span>Change Password</span>
          </Link>
        </div>
        <div className="dropdown-item">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="feather feather-lock"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Lock Screen</span>
          </Link>
        </div>
        <div className="dropdown-item">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Log Out</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProfielMenu;

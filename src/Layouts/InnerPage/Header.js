import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import Language from "./Header/Language";
const Header = () => {
  const [showProfileMenu, setShowMenu] = useState(
    "nav-item dropdown user-profile-dropdown order-lg-0 order-1"
  );
  const [profielInnerMenu, setProfielInnerMenu] = useState(
    "dropdown-menu position-absolute"
  );
  const [t, i18n] = useTranslation("common");

  const showProfielMenu = () => {
    if (
      showProfileMenu ==
      "nav-item dropdown user-profile-dropdown order-lg-0 order-1"
    ) {
      setShowMenu(
        "nav-item dropdown user-profile-dropdown order-lg-0 order-1 show"
      );
      setProfielInnerMenu("dropdown-menu position-absolute show");
    } else {
      setShowMenu("nav-item dropdown user-profile-dropdown order-lg-0 order-1");
      setProfielInnerMenu("dropdown-menu position-absolute");
    }
  };

  return (
    <div className="header-container">
      <header className="header navbar navbar-expand-sm">
        <a href="#" className="sidebarCollapse" data-placement="bottom"></a>

        <div className="nav-logo align-self-center">
          <a className="navbar-brand" href="">
            <img alt="logo" src={require("../../assets/img/Logo-Varan.png")} />
            <span className="navbar-brand-name"></span>
          </a>
        </div>

        <ul className="navbar-item topbar-navigation">
          <div className="topbar-nav header navbar" role="banner">
            <nav id="topbar">
              <ul className="navbar-nav theme-brand flex-row  text-center">
                <li className="nav-item theme-logo">
                  <a href="">
                    <img
                      src="assets/img/logo2.svg"
                      className="navbar-logo"
                      alt="logo"
                    />
                  </a>
                </li>
                <li className="nav-item theme-text">
                  <a href="" className="nav-link"></a>
                </li>
              </ul>

              <ul className="list-unstyled menu-categories" id="topAccordion">
                <li className="menu single-menu">
                  <a
                    href="#menu1"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle autodroprown"
                  >
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>

                      <span>{t("HeaderMenus.Accounts")}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>
                </li>

                <li className="menu single-menu">
                  <a
                    href="#menu2"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="feather feather-box"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>

                      <span>{t("HeaderMenus.Reserves")}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>
                </li>

                <li className="menu single-menu active">
                  <a
                    href="#starter-kit"
                    data-toggle="collapse"
                    aria-expanded="true"
                    className="dropdown-toggle"
                  >
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="feather feather-plus-circle"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>{t("HeaderMenus.NewReserve")}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>
                </li>

                <li className="menu single-menu active">
                  <Link
                    to="/NewAccount"
                    data-toggle="collapse"
                    aria-expanded="true"
                    className="dropdown-toggle"
                  >
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="feather feather-plus-circle"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>{t("HeaderMenus.NewAccount")}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </Link>
                </li>
                <li className="menu single-menu active">
                  <a
                    href="#starter-kit"
                    data-toggle="collapse"
                    aria-expanded="true"
                    className="dropdown-toggle"
                  >
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="feather feather-plus-circle"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>{t("HeaderMenus.NewContact")}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </ul>
        <ul className="navbar-item flex-row ml-auto">
          <li className="nav-item align-self-center search-animated"></li>
        </ul>
        <ul
          className={
            classes.profilemenu +
            " navbar-item" +
            " flex-row" +
            " ml-auto" +
            " nav-dropdowns"
          }
        >
          <li className="nav-item dropdown message-dropdown"></li>
          <li className="nav-item dropdown message-dropdown"></li>
          <Language />
          <li className={showProfileMenu}>
            <a
              className="nav-link dropdown-toggle user"
              id="user-profile-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="media">
                <img
                  onClick={showProfielMenu}
                  src={require("../../assets/img/user.png")}
                  className="img-fluid"
                  alt="admin-profile"
                />
              </div>
            </a>
            <div
              className={profielInnerMenu}
              aria-labelledby="userProfileDropdown"
            >
              <div className="user-profile-section">
                <div className="media mx-auto">
                  <div className="media-body">
                    <h5>Shaun Park</h5>
                    <p>Project Leader</p>
                  </div>
                </div>
              </div>
              <div className="dropdown-item">
                <a href="user_profile.html">
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
                </a>
              </div>
              <div className="dropdown-item">
                <a href="apps_mailbox.html">
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
                  <span>Inbox</span>
                </a>
              </div>
              <div className="dropdown-item">
                <a href="auth_lockscreen.html">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="feather feather-lock"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Lock Screen</span>
                </a>
              </div>
              <div className="dropdown-item">
                <a href="auth_login.html">
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
                </a>
              </div>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;

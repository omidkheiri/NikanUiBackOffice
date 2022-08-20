import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import Language from "./Header/Language";
import ProfielMenu from "./Header/ProfielMenu";
import Shortcuts from "./Header/Shortcuts";

const Header = (props) => {
  const [formIsShown, setFormIsShown] = useState("none");
  const [t] = useTranslation("common");
  const ShowSideBar = () => {
    setFormIsShown("sidebare");
  };

  const cancelModal = () => {
    setFormIsShown("none");
  };
  return (
    <div className="header-container">
      <header className="header navbar navbar-expand-sm">
        <Link to="/" className="sidebarCollapse" data-placement="bottom"></Link>

        <div className="nav-logo align-self-center">
          <Link className="navbar-brand" to="/">
            <img alt="logo" src={require("../../assets/img/Logo-Varan.png")} />
            <span className="navbar-brand-name"></span>
          </Link>
        </div>

        <ul className="navbar-item topbar-navigation">
          <div className="topbar-nav header navbar" role="banner">
            <nav id="topbar">
              <ul className="navbar-nav theme-brand flex-row  text-center">
                <li className="nav-item theme-logo">
                  <Link to="">
                    <img
                      src="assets/img/logo2.svg"
                      className="navbar-logo"
                      alt="logo"
                    />
                  </Link>
                </li>
                <li className="nav-item theme-text">
                  <Link to="/" className="nav-link"></Link>
                </li>
              </ul>

              <ul className="list-unstyled menu-categories" id="topAccordion">
                <li className="menu single-menu">
                  <Link
                    to="/"
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
                  </Link>
                </li>
                <li className="menu single-menu">
                  <Link
                    to="/flights"
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-send"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>

                      <span>{t("HeaderMenus.Flights")}</span>
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
                <li className="menu single-menu"></li>
                <li className="menu single-menu">
                  <Link
                    to="/Reserves"
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
                  </Link>
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
          <li className="nav-item dropdown message-dropdown">
            <div
              className="dropdown-toggle"
              style={{
                display: "flex",
                padding: "0 15px 0 15px",
                height: "100%",
              }}
            >
              <div
                onClick={ShowSideBar}
                className=""
                style={{
                  color: "#337ab7",
                  alignSelf: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
            </div>
            {formIsShown === "sidebare" && (
              <Shortcuts
                cancelCallBack={cancelModal}
                formIsShown={formIsShown}
              ></Shortcuts>
            )}
          </li>
          <Language />
          <ProfielMenu />
        </ul>
      </header>
    </div>
  );
};

export default Header;

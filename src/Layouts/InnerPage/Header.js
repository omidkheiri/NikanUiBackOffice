import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import Language from "./Header/Language";
import ProfielMenu from "./Header/ProfielMenu";
const Header = () => {
  const [t, i18n] = useTranslation("common");

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
                    to="/"
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

                <li className="menu single-menu active">
                  <Link
                    to="/"
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
                  </Link>
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
                  <Link
                    to="/"
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
          <li className="nav-item dropdown message-dropdown"></li>
          <Language />
          <ProfielMenu />
        </ul>
      </header>
    </div>
  );
};

export default Header;

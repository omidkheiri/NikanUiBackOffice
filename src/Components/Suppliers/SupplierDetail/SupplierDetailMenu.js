import React, { useState } from "react";

const SupplierDetailMenu = (props) => {
  const homePage = () => {
    props.updateCurrntPage("home");
  };
  const serviceLocation = () => {
    props.updateCurrntPage("serviceLocation");
  };

  return (
    <ul className="nav nav-tabs  mb-3 mt-3" id="iconTab" role="tablist">
      <li
        onClick={homePage}
        style={{ cursor: "pointer" }}
        className={
          props.currntPage === "home" ? "nav-item  show active " : " nav-item "
        }
      >
        <a className="nav-link">
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
            className="feather feather-home"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </a>
      </li>
      <li
        style={{ cursor: "pointer" }}
        className={
          props.currntPage === "reserve"
            ? "nav-item  show active "
            : " nav-item "
        }
      >
        <a className="nav-link">
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
            className="feather feather-shopping-bag"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Reserves
        </a>
      </li>

      <li
        style={{ cursor: "pointer" }}
        className={
          props.currntPage === "contacts"
            ? "nav-item  show active "
            : " nav-item "
        }
      >
        <a className="nav-link ">
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
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Contacts
        </a>
      </li>

      <li
        style={{ cursor: "pointer" }}
        className={
          props.currntPage === "service"
            ? "nav-item  show active "
            : " nav-item "
        }
      >
        <a className="nav-link ">
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
            className="feather feather-archive"
          >
            <polyline points="21 8 21 21 3 21 3 8"></polyline>
            <rect x="1" y="3" width="22" height="5"></rect>
            <line x1="10" y1="12" x2="14" y2="12"></line>
          </svg>
          Services
        </a>
      </li>

      <li
        onClick={serviceLocation}
        style={{ cursor: "pointer" }}
        className={
          props.currntPage === "serviceLocation"
            ? "nav-item  show active "
            : " nav-item "
        }
      >
        <a className="nav-link ">
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
            className="feather feather-map-pin"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Service Location
        </a>
      </li>
    </ul>
  );
};

export default SupplierDetailMenu;

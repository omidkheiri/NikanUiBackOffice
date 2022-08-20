import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DrawerShortcuts from "../../../Components/UI/DrawerShortcuts";

const Shortcuts = (props) => {
  const [t] = useTranslation("common");
  return (
    <DrawerShortcuts cntx={props}>
      <ul class="list-group list-group-icons-meta p-0">
        <li class="list-group-item list-group-item-action">
          <div class="media">
            <Link
              onClick={props.cancelCallBack}
              to="/NewAccount"
              className="dropdown-toggle"
            >
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
            </Link>
          </div>
        </li>
        <li class="list-group-item list-group-item-action">
          <div className="media">
            <Link
              onClick={props.cancelCallBack}
              to="/NewContact"
              className="dropdown-toggle"
            >
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
            </Link>
          </div>
        </li>
        <li class="list-group-item list-group-item-action">
          <div className="media">
            <Link
              onClick={props.cancelCallBack}
              to="/flight/AirlineNames"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle autodroprown"
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
                className="feather feather-send"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>

              <span>{t("HeaderMenus.AirLineNames")}</span>
            </Link>
          </div>
        </li>
      </ul>
    </DrawerShortcuts>
  );
};

export default Shortcuts;

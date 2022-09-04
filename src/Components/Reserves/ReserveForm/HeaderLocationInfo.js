import React from "react";
import { useTranslation } from "react-i18next";

const HeaderLocationInfo = (props) => {
  const [t] = useTranslation("common");

  return (
    <nav className="breadcrumb-one" aria-label="breadcrumb">
      <div className="title">
        <h3>{t("ReservePage.LocationHeaderTitle")}</h3>
      </div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="">{props.location.title}</a>
        </li>
      </ol>
    </nav>
  );
};

export default HeaderLocationInfo;

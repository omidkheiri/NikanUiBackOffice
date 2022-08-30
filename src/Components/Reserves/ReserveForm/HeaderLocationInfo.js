import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHttp from "../../../Hooks/use-http";

import BasicContext from "../../../Store/enviroment-context";
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

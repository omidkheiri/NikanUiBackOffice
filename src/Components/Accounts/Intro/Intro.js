import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const Intro = () => {
  const [t] = useTranslation("common");
  return (
    <Fragment>
      <h4>{t("Account.Intro.Title")}</h4>
      <textarea
        id="textarea"
        className="form-control textarea"
        maxLength="1500"
        rows="10"
        placeholder={t("Account.Intro.Palceholder")}
      ></textarea>
    </Fragment>
  );
};

export default Intro;

import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const Intro = () => {
  const [t, i18n] = useTranslation("common");
  return (
    <Fragment>
      <h4>{t("Contact.Intro.Title")}</h4>
      <textarea
        id="textarea"
        className="form-control textarea"
        maxLength="1500"
        rows="10"
        placeholder={t("Contact.Intro.Palceholder")}
      ></textarea>
    </Fragment>
  );
};

export default Intro;

import React from "react";
import { useTranslation } from "react-i18next";
import classes from "./CreateAccount.module.css";
const CreateAccount = () => {
  const [t, i18n] = useTranslation("common");
  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
  };

  return (
    <div className={(classes.container, classes.singlFormContent)}>
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          <div className="statbox widget box box-shadow">
            <div className="widget-header">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h4>{t("Account.FormElement.FormTitle")}</h4>
                </div>
              </div>
            </div>
            <div className="widget-content widget-content-area">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="inputAddress" style={styles.textAlign}>
                    {t("Account.FormElement.Title")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder={t("Account.FormElement.Title")}
                  />
                </div>

                <div className="form-row mb-4">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4" style={styles.textAlign}>
                      {t("Account.FormElement.EmailAddress")}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder={t("Account.FormElement.EmailAddress")}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4" style={styles.textAlign}>
                      {t("Account.FormElement.Phone")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder={t("Account.FormElement.Phone")}
                    />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputAddress" style={styles.textAlign}>
                    {t("Account.FormElement.PostalAddress")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder={t("Account.FormElement.PostalAddress")}
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                  {t("Account.FormElement.SaveAccount")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

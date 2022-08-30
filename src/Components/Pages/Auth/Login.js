import React from "react";
import { useTranslation } from "react-i18next";
import "./Login.css";
const Login = () => {
  const [t] = useTranslation("common");
  return (
    <div className="form-container outer">
      <div className="form-form">
        <div className="form-form-wrap">
          <div className="form-container">
            <div className="form-content">
              <h1 className="">{t("LoginPage.FormElement.FormTitle")}</h1>
              <p className="">{t("LoginPage.FormElement.Title")}</p>

              <form className="text-left">
                <div className="form">
                  <div id="username-field" className="field-wrapper input">
                    <label htmlFor="username">
                      {t("LoginPage.FormElement.UserName")}
                    </label>
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
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="form-control"
                      placeholder={t(
                        "LoginPage.FormElement.UserNamePlaceHolder"
                      )}
                    />
                  </div>

                  <div id="password-field" className="field-wrapper input mb-2">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="password">
                        {t("LoginPage.FormElement.Password")}
                      </label>
                      <a
                        href="auth_pass_recovery_boxed.html"
                        className="forgot-pass-link"
                      >
                        {t("LoginPage.FormElement.ForgetPassword")}
                      </a>
                    </div>
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
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder={t(
                        "LoginPage.FormElement.PasswordPlaceHolder"
                      )}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      id="toggle-password"
                      className="feather feather-eye"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div className="d-sm-flex justify-content-between">
                    <div className="field-wrapper">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        value=""
                      >
                        {t("LoginPage.FormElement.LogIn")}
                      </button>
                    </div>
                  </div>

                  <p className="signup-link">
                    {t("LoginPage.FormElement.NotRegisterd")}
                    <p href="auth_register_boxed.html">
                      {t("LoginPage.FormElement.CreateAnAccount")}
                    </p>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

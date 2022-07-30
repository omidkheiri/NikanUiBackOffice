import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import UpdateAccount from "../Update/UpdateAccount";
import { useTranslation } from "react-i18next";
import "./AccountPanel.css";
const AccountPanel = () => {
  const [t, i18n] = useTranslation("common");
  const params = useParams();

  return (
    <Fragment>
      <div className="layout-px-spacing">
        <div className="row layout-spacing">
          <div className="col-xl-3 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
            <div className="user-profile layout-spacing">
              <div className="widget-content widget-content-area">
                <div className=" justify-content-between">
                  <div className="d-flex justify-content-between">
                    <h3 className="">{t("Account.DashboardTitle")}</h3>
                  </div>
                  <hr />
                  <UpdateAccount Account={params} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-6 col-md-7 col-sm-12 layout-top-spacing">
            <div className="bio layout-spacing ">
              <div className="widget-content widget-content-area">
                <h3 className="">Bio</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AccountPanel;

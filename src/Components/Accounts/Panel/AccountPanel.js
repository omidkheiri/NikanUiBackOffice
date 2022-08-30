import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateAccount from "../Update/UpdateAccount";
import { useTranslation } from "react-i18next";
import TabMenuItem from "../../UI/TabMenu/TabMenuItem";
import "./AccountPanel.css";
import SupplierDetail from "../../Suppliers/SupplierDetail/SupplierDetail";
import Intro from "../Intro/Intro";
const AccountPanel = () => {
  const [t] = useTranslation("common");
  const params = useParams();
  const [accountData, setAccountData] = useState("");
  const [currentPageName, setCurrentPage] = useState("intro");
  const [maximize, setMaximize] = useState(false);
  const maximizeTaggel = () => {
    setMaximize(!maximize);
  };
  const FillForm = (data) => {
    setAccountData(data);
  };
  const updateCurrentPage = (data) => {
    setCurrentPage(data);
  };
  return (
    <Fragment>
      <div className="layout-px-spacing">
        <div className="row layout-spacing">
          <div
            className={
              !maximize
                ? "col-xl-3 col-lg-3 col-md-3 col-sm-12 layout-top-spacing"
                : "d-none"
            }
          >
            <div className="user-profile layout-spacing">
              <div className="widget-content widget-content-area">
                <div className=" justify-content-between">
                  <div className="d-flex justify-content-between">
                    <h3 className="">{t("Account.DashboardTitle")}</h3>
                  </div>
                  <hr />
                  <UpdateAccount FillForm={FillForm} Account={params} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              !maximize
                ? "col-xl-9 col-lg-9 col-md-7 col-sm-12 layout-top-spacing"
                : "col-xl-12 col-lg-12 col-md-12 col-sm-12 layout-top-spacing"
            }
          >
            <div className="row">
              <div
                id="tabsVerticalWithIcon"
                className="col-lg-12 col-12 layout-spacing"
              >
                <div className="statbox widget box box-shadow">
                  <div className="widget-header">
                    <div className="row">
                      <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                        <h4 style={{ float: "right" }}>{accountData.title}</h4>
                        <div
                          onClick={maximizeTaggel}
                          className="icon-container"
                          style={{
                            float: "left",
                            marginTop: "10px",
                            cursor: "pointer",
                          }}
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
                            className="feather feather-maximize"
                          >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-content widget-content-area rounded-vertical-pills-icon">
                    <div className="row mb-4 mt-3">
                      <div className="col-sm-2 col-12">
                        <div
                          className="nav flex-column nav-pills mb-sm-0 mb-3"
                          id="rounded-vertical-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <TabMenuItem
                            updateCurrentPage={updateCurrentPage}
                            title={t("Account.HomeMenu")}
                            type="intro"
                            active={
                              currentPageName === "intro" ? "active" : " "
                            }
                          />
                          <TabMenuItem
                            updateCurrentPage={updateCurrentPage}
                            title={t("Account.SupplierMenu")}
                            type="supplier"
                            active={
                              currentPageName === "supplier" ? "active" : " "
                            }
                          />
                          <TabMenuItem
                            updateCurrentPage={updateCurrentPage}
                            title={t("Account.CustomerMenu")}
                            type="customer"
                            active={
                              currentPageName === "customer" ? "active" : " "
                            }
                          />
                        </div>
                      </div>

                      <div className="col-sm-10 col-12">
                        <div
                          className="tab-content"
                          id="rounded-vertical-pills-tabContent"
                        >
                          <div className="tab-pane fade show active">
                            {currentPageName === "supplier" && (
                              <SupplierDetail />
                            )}
                            {currentPageName === "customer" && (
                              <SupplierDetail />
                            )}
                            {currentPageName === "intro" && <Intro />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AccountPanel;

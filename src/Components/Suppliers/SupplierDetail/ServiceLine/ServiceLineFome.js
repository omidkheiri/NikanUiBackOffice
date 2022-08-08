import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import useHttp from "../../../../Hooks/use-http";
import BasicContext from "../../../../Store/enviroment-context";
import DropDown from "../../../UI/FormElement/DropDown";
import InputText from "../../../UI/FormElement/InputText";

import Modal from "../../../UI/Modal";
const ServiceLineFome = (props) => {
  const UpdateList = (data) => {
    props.UpdateList();
  };
  const [t, i18n] = useTranslation("common");
  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
  };
  const [formData, setFormData] = useState({});
  const [formIsValid, setformIsValid] = useState();
  const basicContext = useContext(BasicContext);
  const params = useParams();

  const [requestData, setRequestData] = useState({
    Title: "",
    Status: false,
    TaxInclude: false,
    ServiceLocationId: "",
    ServiceTypeId: 0,
    FinancialCode: "",
    FinancialTitle: "",
  });

  const {
    isLoading,
    error,
    sendRequest: fetchServiceLine,
  } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/Account/${params.AccountId}/ServiceLine`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    UpdateList
  );
  const updateForm = (data, Id, valid) => {
    formData[Id] = { data: data, isValid: valid };

    setFormData(formData);
    console.log(formData);
    checkForm();
  };

  const [serviceLocationOption, setServiceLocationOption] = useState([]);
  const [serviceTypeOption, setServiceserviceTypeOption] = useState([]);
  const fillLocationOption = (data) => {
    setServiceLocationOption(
      data.map((data) => {
        return { value: data.id, label: data.title };
      })
    );
  };
  const {
    isLocationLoading,
    errorLocation,
    sendRequest: fetchLocation,
  } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation?AccountId=${params.AccountId}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillLocationOption
  );
  const fillServieTypeOption = (data) => {
    console.log(data);
    setServiceserviceTypeOption(
      data.map((data) => {
        return { value: data.id, label: data.name };
      })
    );
  };
  const {
    isServiceTypeLoading,
    errorServiceType,
    sendRequest: fetchServiceTypes,
  } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/ServiceTypes`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillServieTypeOption
  );

  useEffect(() => {
    fetchLocation();
    fetchServiceTypes();
  }, []);

  const checkForm = () => {
    if (
      formData.Title &&
      formData.ServiceLocationId &&
      formData.ServiceTypeId &&
      formData.FinancialTitle &&
      formData.FinancialCode &&
      formData.Title.isValid === true &&
      formData.ServiceLocationId.isValid === true &&
      formData.ServiceTypeId.isValid === true &&
      formData.FinancialTitle.isValid === true &&
      formData.FinancialCode.isValid === true
    ) {
      setformIsValid(true);

      setRequestData({
        Title: formData.Title.data,
        Status: true,
        TaxInclude: true,
        ServiceLocationId: formData.ServiceLocationId.data.value,
        ServiceTypeId: formData.ServiceTypeId.data.value,
        FinancialCode: formData.FinancialCode.data,
        FinancialTitle: formData.FinancialTitle.data,
      });
    } else {
      setformIsValid(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    fetchServiceLine();
  };
  return (
    <Modal cntx={props}>
      <div className="col-lg-12 layout-spacing">
        <form onSubmit={submitForm}>
          <div className="form-group mb-4">
            <DropDown
              textAlign={styles.textAlign}
              title={t("ServiceLine.FormElement.ServiceLocationId")}
              type="text"
              id="ServiceLocationId"
              IsRequired={true}
              MinLength={0}
              RegexFormat=""
              options={serviceLocationOption}
              valueCallback={updateForm}
              requiredMassage={t(
                "ServiceLine.FormElement.ServiceLocationIdRequiredMessage"
              )}
            />
          </div>
          <div className="form-group mb-4">
            <DropDown
              textAlign={styles.textAlign}
              title={t("ServiceLine.FormElement.ServiceTypeId")}
              type="text"
              id="ServiceTypeId"
              IsRequired={true}
              MinLength={0}
              options={serviceTypeOption}
              RegexFormat=""
              valueCallback={updateForm}
              requiredMassage={t(
                "ServiceLine.FormElement.ServiceTypeIdRequiredMessage"
              )}
            />
          </div>
          <div className="form-group mb-4">
            <InputText
              textAlign={styles.textAlign}
              title={t("ServiceLine.FormElement.Title")}
              type="text"
              id="Title"
              IsRequired={true}
              MinLength={3}
              RegexFormat=""
              valueCallback={updateForm}
              requiredMassage={t(
                "ServiceLine.FormElement.TitleRequiredMessage"
              )}
            />
          </div>
          <div className="form-row  mb-4">
            <div className="form-group col-md-6">
              <InputText
                textAlign={styles.textAlign}
                title={t("ServiceLine.FormElement.FinancialCode")}
                type="text"
                id="FinancialCode"
                IsRequired={true}
                MinLength={3}
                RegexFormat=""
                valueCallback={updateForm}
                requiredMassage={t(
                  "ServiceLine.FormElement.FinancialCodeRequiredMessage"
                )}
              />
            </div>

            <div className="form-group col-md-6">
              <InputText
                textAlign={styles.textAlign}
                title={t("ServiceLine.FormElement.FinancialTitle")}
                type="text"
                id="FinancialTitle"
                IsRequired={true}
                MinLength={3}
                RegexFormat=""
                valueCallback={updateForm}
                requiredMassage={t(
                  "ServiceLine.FormElement.FinancialTitleRequiredMessage"
                )}
              />
            </div>
          </div>
          <div className="form-row  mb-4">
            <div className="form-group col-md-6">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  value="true"
                  className="custom-control-input"
                  id="Status"
                />
                <label className="custom-control-label" htmlFor="Status">
                  {t("ServiceLine.FormElement.Status")}
                </label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="TaxInclude"
                />
                <label className="custom-control-label" htmlFor="TaxInclude">
                  {t("ServiceLine.FormElement.TaxInclude")}
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={!formIsValid}
            className="btn btn-primary mt-3"
          >
            {t("ServiceLine.FormElement.SaveAccount")}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ServiceLineFome;

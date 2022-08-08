import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHttp from "../../../../Hooks/use-http";
import BasicContext from "../../../../Store/enviroment-context";
import DropDown from "../../../UI/FormElement/DropDown";
import InputText from "../../../UI/FormElement/InputText";
import GetServieLocations from "../../../../Hooks/ServiceLocation/GetServieLocations";
import Modal from "../../../UI/Modal";
import GetServieTypes from "../../../../Hooks/ServiceLocation/GetServieTypes";
import GetServieLine from "../../../../Hooks/ServiceLocation/GetServieLine";
const ServiceLineUpdateFome = (props) => {
  const taxElement = useRef();
  const statusElement = useRef();

  const [formData, setFormData] = useState({});
  const [formISSubmitted, setFormISSubmitted] = useState({});
  const [formIsValid, setformIsValid] = useState();
  const basicContext = useContext(BasicContext);
  const params = useParams();
  const [serviceLocationOption, setServiceLocationOption] = useState([]);
  const [serviceTypeOption, setServiceTypeOption] = useState([]);
  const [selectedServiceType, setselectedServiceType] = useState({});
  const [currentAccourntId, setCurrentAccourntId] = useState(params.AccountId);
  const [t, i18n] = useTranslation("common");
  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
  };
  const [selectedServiceLocation, setselectedServiceLocation] = useState({});
  const [requestData, setRequestData] = useState({
    Title: "",
    ServiceLineStatus: 0,
    TaxInclude: 0,
    ServiceLocationId: {},
    ServiceTypeId: {},
    FinancialCode: "",
    FinancialTitle: "",
  });

  const UpdateList = (data) => {
    props.UpdateList();
  };

  const {
    isLoading,
    error,
    sendRequest: fetchServiceLine,
  } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/Account/${params.AccountId}/ServiceLine/${props.UpdatingRecordId}`,
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    UpdateList
  );
  const updateForm = (data, Id, valid) => {
    console.log(data);
    formData[Id] = { data: data, isValid: valid };

    setFormData(formData);

    checkForm();
  };

  const updateLocation = (data) => {
    setServiceLocationOption(
      data.map((d) => {
        return { value: d.id, label: d.title };
      })
    );
  };

  const updateTypes = (data) => {
    console.log("reponse");
    console.log(data);
    setServiceTypeOption(
      data.map((d) => {
        return { value: d.id, label: d.name };
      })
    );
  };
  useEffect(() => {
    if (!selectedServiceType && requestData.ServiceTypeId) {
      setselectedServiceType(
        serviceTypeOption.find((x) => x.value === requestData.ServiceTypeId)
      );
    }
  }, [selectedServiceType]);
  // useEffect(() => {
  //   fetchUpdatingRecord();
  // }, [props.formIsShown]);

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
    } else {
      setformIsValid(true);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (formIsValid) {
      setRequestData({
        Title: formData.Title.data,
        ServiceLineStatus: statusElement.current.checked ? 1 : 0,
        TaxInclude: taxElement.current.checked ? 1 : 0,
        ServiceLocationId: formData.ServiceLocationId.data.value,
        ServiceTypeId: formData.ServiceTypeId.data.value,
        FinancialCode: formData.FinancialCode.data,
        FinancialTitle: formData.FinancialTitle.data,
      });
    }
    setFormISSubmitted(true);
  };

  useEffect(() => {
    fetchServiceLine();
  }, [formISSubmitted]);

  const getServiceLine = (data) => {
    setRequestData({
      Title: data.title,
      ServiceLineStatus: data.serviceLineStatus,
      TaxInclude: data.taxInclude,
      ServiceLocationId: data.serviceLocationId,
      ServiceTypeId: data.serviceTypeId,
      FinancialCode: data.financialCode,
      FinancialTitle: data.financialTitle,
    });
    statusElement.current.checked = data.serviceLineStatus;
    taxElement.current.checked = data.taxInclude;
    setselectedServiceLocation({
      value: data.serviceLocation.id,
      label: data.serviceLocation.title,
    });
    setselectedServiceType(
      serviceTypeOption.find((x) => x.value === data.serviceTypeId)
    );
    setformIsValid(true);
  };
  useEffect(() => {
    setCurrentAccourntId(params.AccountId);
  }, [selectedServiceLocation, selectedServiceType]);

  const updateServiceLineStatus = (event) => {
    if (!event.currentTarget.checked) {
      statusElement.checked = false;
    } else {
      statusElement.checked = true;
    }
  };
  const updateTaxInclude = (event) => {
    if (!event.currentTarget.checked) {
      taxElement.checked = false;
    } else {
      taxElement.checked = true;
    }
  };

  return (
    <Modal cntx={props}>
      <GetServieLine
        response={getServiceLine}
        accountId={currentAccourntId}
        serviceId={props.UpdatingRecordId}
      />

      <GetServieLocations
        response={updateLocation}
        accountId={currentAccourntId}
      />
      <GetServieTypes response={updateTypes} accountId={currentAccourntId} />
      <div className="col-lg-12 layout-spacing">
        <form onSubmit={submitForm}>
          <div className="form-group mb-4">
            <DropDown
              textAlign={styles.textAlign}
              title={t("ServiceLine.FormElement.ServiceLocationId")}
              value={selectedServiceLocation}
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
              value={selectedServiceType}
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
              value={requestData.Title}
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
                value={requestData.FinancialCode}
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
                value={requestData.FinancialTitle}
                requiredMassage={t(
                  "ServiceLine.FormElement.FinancialTitleRequiredMessage"
                )}
              />
            </div>
          </div>
          <div className="form-row  mb-4">
            <div className="form-group col-md-6">
              <div className="custom-control custom-checkbox">
                {requestData.ServiceLineStatus}
                <input
                  onChange={updateServiceLineStatus}
                  type="checkbox"
                  className="custom-control-input"
                  id="ServiceLineStatus"
                  ref={statusElement}
                />

                <label
                  className="custom-control-label"
                  htmlFor="ServiceLineStatus"
                >
                  {t("ServiceLine.FormElement.Status")}
                </label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="custom-control custom-checkbox">
                <input
                  onChange={updateTaxInclude}
                  type="checkbox"
                  className="custom-control-input"
                  id="TaxInclude"
                  ref={taxElement}
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

export default ServiceLineUpdateFome;

import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GetServieLine from "../../../../Hooks/ServiceLocation/GetServieLine";
import Drawer from "../../../UI/Drawer";
import { JsonEditor as Editor } from "jsoneditor-react";
import Ajv from "ajv";
import "./ServiceLineSchema.css";
import useHttp from "../../../../Hooks/use-http";
import BasicContext from "../../../../Store/enviroment-context";
import { useRef } from "react";
const ServiceLineSchema = (props) => {
  const ajv = new Ajv({ allErrors: true, verbose: true });

  const basicContext = useContext(BasicContext);
  const [serviceLine, setServiceLine] = useState();
  const [scheme, setscheme] = useState();
  const schemaRref = useRef();
  const params = useParams();
  const [currentAccourntId] = useState(params.AccountId);

  const GoToPanel = (data) => {
    setServiceLine(data);
  };

  const { sendRequest: putscheme } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/account/${currentAccourntId}/ServiceLine/${props.updatingRecordId}/UpdateSchema`,
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: scheme,
    },
    GoToPanel
  );

  const SubmitForm = (event) => {
    event.preventDefault();

    putscheme();
  };

  const getServieLine = (data) => {
    setServiceLine(data);
    setscheme(JSON.parse(data.serviceLineScheme.replaceAll("'", '"')));
  };
  const updateScheme = (event) => {
    setscheme(JSON.stringify(event));
  };
  return (
    <Drawer cntx={props}>
      <GetServieLine
        extend={true}
        response={getServieLine}
        accountId={currentAccourntId}
        serviceId={props.updatingRecordId}
      />
      <div className="col-lg-12 layout-spacing">
        <div id="timelineBasic" className="col-lg-12 layout-spacing">
          <div className="widget-content widget-content-area mb-1">
            <h4>{serviceLine ? serviceLine.title : ""}</h4>
            <div className="mt-container mx-auto ">
              <form onSubmit={SubmitForm}>
                <div className="row mb-4">
                  <div className="form-group mb-0 col">
                    <label htmlFor="start">From:</label>

                    {scheme && (
                      <Editor
                        ajv={ajv}
                        ref={schemaRref}
                        onChange={updateScheme}
                        value={scheme}
                      />
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="form-group mb-0 col">
                    <button type="submit" className="btn btn-primary">
                      save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ServiceLineSchema;

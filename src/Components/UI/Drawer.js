import React from "react";
import ReactDOM from "react-dom";
import "animate.css";
import { Animated } from "react-animated-css";
import "./Drawer.css";
const Backdrop = (props) => {
  return (
    <div
      className={`modal-backdrop fade ${props.formIsShown ? "show" : " "}`}
      style={{ display: `${props.formIsShown ? "block" : "none"}` }}
    ></div>
  );
};
const ModalOverlay = (props) => {
  const cancelModal = () => {
    props.cancelModal();
  };

  return (
    <div
      className={`modal fade ${props.formIsShown ? "show" : " "}`}
      style={{
        display: `${props.formIsShown ? "block" : "none"}`,
      }}
    >
      <div className="drawer-dialog drawer" role="document">
        <Animated
          className="drawer-content"
          animationIn="slideInLeft"
          animationOut="fadeOut"
          isVisible={props.formIsShown !== "none"}
        >
          <div className="modal-content drawer-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
              <button
                onClick={cancelModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer"></div>
          </div>
        </Animated>
      </div>
    </div>
  );
};
const portalElemnt = document.getElementById("overlays");

const Drawer = (props) => {
  const cancelModal = () => {
    props.cntx.cancelCallBack();
  };
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop formIsShown={props.cntx.formIsShown}></Backdrop>,
        portalElemnt
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          cancelModal={cancelModal}
          formIsShown={props.cntx.formIsShown}
        >
          {props.children}
        </ModalOverlay>,
        portalElemnt
      )}
    </div>
  );
};

export default Drawer;

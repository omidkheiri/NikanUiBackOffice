import React from "react";

const MainContent = (props) => {
  return (
    <div className="main-container" id="container">
      <div className="overlay"></div>
      <div className="search-overlay"></div>
      <div id="content" className="main-content">
        {props.children}
      </div>
    </div>
  );
};
export default MainContent;

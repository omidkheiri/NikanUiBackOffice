import React from "react";

const Breadcrumb = (props) => {
  return (
    <div className="page-header">
      <nav className="breadcrumb-one" aria-label="breadcrumb">
        <div className="title">
          <h3>{props.title}</h3>
        </div>
      </nav>
    </div>
  );
};

export default Breadcrumb;

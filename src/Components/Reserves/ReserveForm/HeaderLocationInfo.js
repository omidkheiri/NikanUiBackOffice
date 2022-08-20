import React from "react";

const HeaderLocationInfo = () => {
  return (
    <nav className="breadcrumb-one" aria-label="breadcrumb">
      <div className="title">
        <h3>Basic1</h3>
      </div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="">Forms</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href="">Basic</a>
        </li>
      </ol>
    </nav>
  );
};

export default HeaderLocationInfo;

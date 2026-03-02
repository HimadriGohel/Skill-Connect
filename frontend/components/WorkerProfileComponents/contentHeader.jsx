import React from "react";
import '../../src/Worker-Profile/Worker-profile.css'
const ContentHeader = () => {
  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Welcome, <span style={{ color: "#ff9502" }}>To your profile</span></h1>
          </div>
        </div>
      </div>
    </section >
  );
};

export default ContentHeader;

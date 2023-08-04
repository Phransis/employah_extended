import React from "react";
import mobileApp from "../../assets/dms-app-3.jpeg";

function Download() {
  return (
    <div className="text-center p-5 mt-5">
      <div>
        <h3 className="display-3 mb-4">Download Our Apps</h3>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary mx-3 fs-3 w-block">
            Windows
          </button>
          <button className="btn btn-outline-success mx-3 fs-3 w-block">
            Mac
          </button>
          <button className="btn btn-outline-primary mx-3 fs-3 w-block">
            Linux
          </button>
        </div>
      </div>
      <div>
        <img src={mobileApp} alt="" className="img-fluid m-5 w-75" />
      </div>
    </div>
  );
}

export default Download;

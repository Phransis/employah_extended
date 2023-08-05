import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-0 bg-img pb-5">
      <div className="d-flex justify-content-center align-items-center vh-75">
        <div className="text-center">
          <div>
            <p
              className="display-3 text-light"
            >
              Manage your ride with DMS,
            </p>
            <p className="display-4 text-muted">Fair trade and productivity</p>
          </div>
          <button
            type="button"
            className="btn btn-primary fs-4 mt-5"
            onClick={() => navigate("/login")}
          >
            Sign up to drive
          </button>
        </div>
        {/* <div className="text-center w-50">
          <img src={driverPhoto} alt="" className="w-100" />
        </div> */}
      </div>
      <div className="d-flex align-items-center justify-content-center pt-5">
        <Link to="/about" className="fs-2 text-decoration-none">
          Learn more about DMS <ArrowForwardIosIcon />
        </Link>
      </div>
    </div>
  );
}

export default Landing;

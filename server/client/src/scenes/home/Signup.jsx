import React from "react";

function Signup() {
  return (
    <div className="container-lg d-flex justify-content-center mb-5">
      <button
        type="button"
        className="btn btn-primary p-3 fs-4"
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          scrollTo(0, 0);
        }}
      >
        Sign up to drive with DMS
      </button>
    </div>
  );
}
  
export default Signup;

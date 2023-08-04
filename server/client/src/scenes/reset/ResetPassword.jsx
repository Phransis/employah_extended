import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import vpassLogo from "../../assets/vpass-logo.png";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setErrorMessage, setSuccessMessage } from "../../state";
import axios from "axios";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetValues = {
    email: "",
    driverLicense: "",
  };

  const resetValidation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email required"),
    driverLicense: Yup.string().required("Driver License is required"),
  });

  const resetSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/1.0/auth/sendEmailForPasswordReset",
        {
          ...values,
        }
      );
      dispatch(setSuccessMessage({ message: response.data.message }));
      dispatch(setEmail(values.email));
      navigate("/confirm");
    } catch (err) {
      dispatch(setErrorMessage({ message: "Error occured, try again later" }));
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Formik
        initialValues={resetValues}
        validationSchema={resetValidation}
        onSubmit={resetSubmit}
      >
        <Form>
          <fieldset className="d-flex flex-column p-4 m-3 border border-1 rounded-5">
            <legend className="fs-3 fw-bold mb-4 text-center">
              <img
                className="img-fluid w-25 border rounded-5 mb-5"
                src={vpassLogo}
                alt="VPASS logo"
              />
              <div className="fs-4 fw-normal">Reset your password</div>
            </legend>
            <div className="form-floating mb-3">
              <Field
                name="email"
                type="email"
                id="email"
                className="form-control fs-3 border border-1"
                placeholder="name@example.com"
              />
              <label
                htmlFor="email"
                style={{
                  color: theme.palette.primary[500],
                }}
              >
                Email
              </label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="email"
              />
            </div>

            <div className="form-floating my-3">
              <Field
                name="driverLicense"
                type="text"
                id="driverLicense"
                className="form-control fs-3 border border-1"
                placeholder="Uppercase-lowercase-number"
              />
              <label
                htmlFor="driverLicense"
                style={{
                  color: theme.palette.primary[500],
                }}
              >
                Driver License
              </label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="driverLicense"
              />
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary fs-4">
                {isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Click to reset your password"
                )}
              </button>
            </div>
          </fieldset>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;

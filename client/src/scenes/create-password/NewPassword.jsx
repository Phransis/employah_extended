import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import vpassLogo from "../../assets/vpass-logo.png";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage } from "../../state";
import { useNavigate } from "react-router-dom";


const NewPassword = () => {
  const [isLoading] = useState(false);
  const theme = useTheme();
  const email = useSelector((state) => state.auth.userEmail)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const resetValues = {
    token: "",
    password: "",
    confirmPassword: "",
  };

  const resetValidation = Yup.object().shape({
    token: Yup.string().required("Activation token is required"),
    password: Yup.string().required("Password required"),
    confirmPassword: Yup.string().required("Passwords must match"),
  });

  const resetSubmit = async (values) => {
    try {
        const response = await axios.post("http://localhost:7000/api/1.0/auth/activate", {
            activationToken: values.token,
            password: values.password,
            email: email
        })

        dispatch(setSuccessMessage({message: response.data.message}))
        navigate("/login")
    } catch(err) {
        dispatch(setErrorMessage({message: "Account activation unsuccessfull"}))
    }
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
              <div className="fs-4 fw-normal">Create Password</div>
            </legend>
            <div className="form-floating mb-3">
              <Field
                name="token"
                type="text"
                id="token"
                className="form-control fs-3 border border-1"
                placeholder="name@example.com"
              />
              <label
                htmlFor="token"
                style={{
                  color: theme.palette.primary[500],
                }}
              >
                Activation token
              </label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="token"
              />
            </div>

            <div className="form-floating mb-3">
              <Field
                name="password"
                type="password"
                id="password"
                className="form-control fs-3 border border-1"
                placeholder="Uppercase-lowercase-number"
              />
              <label
                htmlFor="password"
                style={{
                  color: theme.palette.primary[500],
                }}
              >
                New Password
              </label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="password"
              />
            </div>

            <div className="form-floating mb-3">
              <Field
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                className="form-control fs-3 border border-1"
                placeholder="Uppercase-lowercase-number"
              />
              <label
                htmlFor="confirmPassword"
                style={{
                  color: theme.palette.primary[500],
                }}
              >
                Confirm New Password
              </label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="confirmPassword"
              />
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary fs-4">
                {isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Create password"
                )}
              </button>
            </div>
          </fieldset>
        </Form>
      </Formik>
    </div>
  );
};

export default NewPassword;

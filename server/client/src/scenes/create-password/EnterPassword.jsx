import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import vpassLogo from "../../assets/vpass-logo.png";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage, setToken } from "../../state";
import { useNavigate } from "react-router-dom";

const EnterPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const email = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginValues = {
    password: "",
  };

  const loginValidation = Yup.object().shape({
    password: Yup.string().required("Password required"),
  });

  const loginSumbit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/1.0/auth/login",
        {
          email: email,
          password: values.password,
        }
      );

      dispatch(setSuccessMessage({ message: response.data.message }));
      dispatch(setToken(response.data.token));
      navigate("/profile");
    } catch (err) {
      dispatch(setErrorMessage({ message: err.response.data.message }));

      if (err.response.status === 403) {
        navigate("/confirm")
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Formik
        initialValues={loginValues}
        validationSchema={loginValidation}
        onSubmit={loginSumbit}
      >
        <Form>
          <fieldset className="d-flex flex-column p-4 m-3 border border-1 rounded-5">
            <legend className="fs-3 fw-bold mb-4 text-center">
              <img
                className="img-fluid w-25 border rounded-5 mb-5"
                src={vpassLogo}
                alt="VPASS logo"
              />
              <div className="fs-4 fw-normal">Enter Password</div>
            </legend>

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
                Password
              </label>
              <ErrorMessage
                component="div"
                className="text-danger"
                name="password"
              />
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary fs-4">
                {isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login Now"
                )}
              </button>
            </div>
          </fieldset>
        </Form>
      </Formik>
    </div>
  );
};

export default EnterPassword;

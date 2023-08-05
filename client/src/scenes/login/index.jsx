import React, { useEffect, useState } from "react";
import { setToken } from "../../state";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import vpassLogo from "../../assets/vpass-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setSuccessMessage, setErrorMessage, userAuth } from "../../state";
import { useTheme } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    dispatch(setToken(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/1.0/auth",
        {
          ...values,
        }
      );

      dispatch(userAuth(response.data));
      dispatch(setSuccessMessage({ message: "Login Successful" }));
      dispatch(setErrorMessage({}));
      dispatch(setToken(response.data.token));
      navigate("/my documents");
    } catch (err) {
      dispatch(setErrorMessage({ message: err.response.data.message }));
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/1.0/users",
        {
          ...values,
        }
      );
      dispatch(userAuth(response.data));
      dispatch(
        setSuccessMessage({
          message:
            "User created successfully, please login with your email and password",
        })
      );
      navigate("/login");
      setIsLogin(true);
    } catch (err) {
      if (err.response) {
        dispatch(setErrorMessage(err.response.data.validationErrors));
      } else if (err.request) {
        dispatch(setErrorMessage({ message: "Network error, reconnect" }));
      } else {
        dispatch(setErrorMessage({ message: err.message }));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Formik
        initialValues={isLogin ? loginValues : registerValues}
        validationSchema={
          isLogin ? loginValuesValidation : registerValuesValidation
        }
        onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
      >
        <Form>
          <fieldset className="d-flex flex-column p-4 m-3 border border-1 rounded-5">
            {/* LOGIN */}
            {isLogin && (
              <>
                <legend className="fs-3 fw-bold mb-4 text-center">
                  <img
                    className="img-fluid w-25 border rounded-5 mb-5"
                    src={vpassLogo}
                    alt="VPASS logo"
                  />
                  <div className="fs-4 fw-normal">
                    Sign-in to your DMS Account
                  </div>
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
                      "Login"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* REGISTRATION */}
            {!isLogin && (
              <>
                <legend className="fs-3 fw-bold mb-4 text-center">
                  <img
                    className="img-fluid w-25 border rounded-5 mb-5"
                    src={vpassLogo}
                    alt="VPASS logo"
                  />
                  <div className="fs-4 fw-normal">
                    Sign-up for a VPASS account
                  </div>
                </legend>
                <div className="form-floating mb-3">
                  <Field
                    name="username"
                    type="username"
                    className="form-control fs-3 border border-1"
                    placeholder="John Doe"
                  />
                  <label
                    htmlFor="username"
                    className="form-label fs-5"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Username
                  </label>
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="username"
                  />
                </div>

                <div className="form-floating mb-3 mt-3">
                  <Field
                    name="email"
                    type="email"
                    className="form-control fs-3 border border-1"
                    placeholder="name@example.com.gh"
                  />
                  <label
                    htmlFor="email"
                    className="form-label fs-5"
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

                <div className="form-floating mb-3 mt-3">
                  <Field
                    name="password"
                    type="password"
                    className="form-control fs-3 border border-1"
                    placeholder="Uppercase-lowercase-number"
                  />
                  <label
                    htmlFor="password"
                    className="form-label fs-5"
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
                <div className="form-floating mb-3 mt-3">
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control fs-3 border border-1"
                    placeholder="Uppercase-lowercase-number"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fs-5"
                    style={{
                      color: theme.palette.primary[500],
                    }}
                  >
                    Confirm Password
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
                      "Create Account"
                    )}
                  </button>
                </div>
              </>
            )}
            <div className="mx-2 my-4">
              {isLogin && (
                <a className="" href="#home" onClick={() => setIsLogin(false)}>
                  Don't have an account?, Sign-up
                </a>
              )}
              {!isLogin && (
                <a className="" href="#home" onClick={() => setIsLogin(true)}>
                  Already have an account?, Login
                </a>
              )}
            </div>
          </fieldset>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};


const loginValues = { email: "", password: "" };

const registerValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const loginValuesValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email required"),
  password: Yup.string().required("Password is required"),
});

const registerValuesValidation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(/^.{6,}$/, "  Must be 6 or more characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password field is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

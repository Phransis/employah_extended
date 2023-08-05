import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUserField } from "../state/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.registration.user);

  const registerFormValues = { email: "", contact: "", city: "" };

  const registerFormValuesValidation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email required"),
    contact: Yup.string().required("Contact Required"),
    city: Yup.string().required("City required"),
  });

  const handleSubmit = (values) => {
    dispatch(updateUserField({ ...values }));
    navigate("/profile-form");
    console.log("User in Register: " + user?.email);
  };

  return (
    <Formik
      initialValues={registerFormValues}
      validationSchema={registerFormValuesValidation}
      onSubmit={handleSubmit}
    >
      <Form>
        <fieldset className="d-flex flex-column">
          <legend className="fs-3 fw-bold mb-4">
            Signup as a driver below
          </legend>

          <div className="mb-1">
            <label htmlFor="email" className="form-label fs-5">
              Email
            </label>
            <Field name="email" type="email" className="form-control fs-3" />
            <ErrorMessage name="email" />
          </div>

          <div className="mb-3">
            <label htmlFor="contact" className="form-label fs-5">
              Contact
            </label>
            <Field name="contact" type="text" className="form-control fs-3" />
            <ErrorMessage name="contact" />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label fs-5">
              City
            </label>
            <Field name="city" type="text" className="form-control fs-3" />
            <ErrorMessage name="city" />
          </div>

          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary fs-4">
              Next
            </button>
          </div>
        </fieldset>
      </Form>
    </Formik>
  );
};

function Register() {
  return (
    <div className="container d-flex flex-column flex-lg-row justify-content-center align-items-center py-2 my-2">
      <div className="vw-50 h-50">
        <h1 className="display-1 text-light">Drive with DMS</h1>
        <p className="text-light text-opacity-75 fs-2">
          Earn good money{" "}
          <em className="text-light fw-semibold">with your vehicle</em>
        </p>
      </div>
      <div className="p-4 shadow-lg bg-light rounded-5">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;

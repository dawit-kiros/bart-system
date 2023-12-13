import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";

function UserForm() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      setSuccessful(false);
      try {
        const response = await AuthService.register(
          values.username,
          values.email,
          values.password
        );
        setMessage(response.data.message);
        setSuccessful(true);
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {!successful && (
          <div className="bg-grey-lighter flex flex-col">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-8 py-4 rounded shadow-md text-black w-full">
                
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  placeholder="username"
                  className={`form-control ${
                    formik.touched.username && formik.errors.username
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="invalid-feedback">
                    {formik.errors.username}
                  </div>
                )}

                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}

                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="password"
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full text-center py-1 rounded bg-lime-500 text-white hover:bg-lime focus:outline-none my-1"
                  disabled={formik.isSubmitting}
                >
                  Add
                </button>

                {formik.status && formik.status.error && (
                  <div className="alert alert-danger mt-3">
                    {formik.status.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          
          </div>
        )}
      </form>
    </>
  );
}

export default UserForm;
// jj

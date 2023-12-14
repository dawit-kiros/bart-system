import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { useNavigate } from "react-router-dom";
import { demouser } from "../Assets/index";

const Login = () => {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",

      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),

      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        // await AuthService.login(values.username, values.password);
        // If login is successful, you can navigate to another page or perform additional actions

        await AuthService.login(values.username, values.password);
        navigate("/profile");
        window.location.reload();

        console.log("Login successful");
      } catch (error) {
        console.log( error)
        setStatus({ error: error.response.data.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="col-md-12">
      <div className="card card-container border border-primary">
      <div className="rounded-full h-24 w-24 bg-gray-300 flex items-center justify-center mr-4">
                    <img src={demouser} alt="avatar" className="rounded-full h-20 w-20" />
                  </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`form-control ${
                formik.touched.username && formik.errors.username
                  ? "is-invalid"
                  : "border border-primary"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="invalid-feedback">{formik.errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : "border border-primary"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="px-10 py-1.5 shadow-lg bg-gradient-to-r from-purple-600 to-blue-500 font-medium text-gray-100 block transition duration-300"
            disabled={formik.isSubmitting}
          >
            
            Login
          </button>

          {formik.status && formik.status.error && (
            <div className="alert alert-danger mt-3">{formik.status.error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

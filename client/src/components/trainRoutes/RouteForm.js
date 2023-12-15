import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RouteService from "../../services/route.service";

function UserForm(props) {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name	:	"",
      abbr	:	"",
      routeID	:	"",
      number	:	"",
      color	:	"",
      direction	:	"",   
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      abbr: Yup.string().required("abbr is required"),
      routeID	:Yup.string().required("routeID is required"),
      number	:	Yup.string().required("number is required"),
      color	:	Yup.string().required("color is required"),
      direction	:	Yup.string().required("direction is required"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      setSuccessful(false);
      try {
        const response = await RouteService.register(
          values.name,
          values.abbr,          
          values.routeID,
          values.number,
          values.color,
          values.direction,
          
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
                <div className="flex px-3 ">
                  <label
                    className=" px-3"
                    hidden={props.routeData.id !== "" ? false : true}
                  >
                    {" "}
                    Id:{" "}
                  </label>{" "}
                  <input
                    type="text"
                    id="_id"
                    name="_id"
                    value={
                      props.routeData.id !== ""
                        ? props.routeData.id
                        : formik.values.id
                    }
                    disabled={true}
                    hidden={props.routeData.id !== "" ? false : true}
                    className="block border border-grey-light py-1 px-3 w-full p-3 rounded mb-4 text-zinc-400"
                  />
                </div>

                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.routeData.name !== ""
                      ? props.routeData.name
                      : formik.values.name
                  }
                  placeholder="name"
                  className={`form-control ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">
                    {formik.errors.name}
                  </div>
                )}

                <input
                  type="text"
                  id="abbr"
                  name="abbr"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.routeData.abbr !== ""
                      ? props.routeData.abbr
                      : formik.values.abbr
                  }
                  placeholder="abbr"
                  className={`form-control ${
                    formik.touched.abbr && formik.errors.abbr
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.abbr && formik.errors.abbr && (
                  <div className="invalid-feedback">{formik.errors.abbr}</div>
                )}

<input
                  type="text"
                  id="routeID"
                  name="routeID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.routeData.routeID !== ""
                      ? props.routeData.routeID
                      : formik.values.routeID
                  }
                  placeholder="routeID"
                  className={`form-control ${
                    formik.touched.routeID && formik.errors.routeID
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.routeID && formik.errors.routeID && (
                  <div className="invalid-feedback">{formik.errors.routeID}</div>
                )}

<input
                  type="text"
                  id="number"
                  name="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.routeData.number !== ""
                      ? props.routeData.number
                      : formik.values.number
                  }
                  placeholder="number"
                  className={`form-control ${
                    formik.touched.number && formik.errors.number
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.number && formik.errors.number && (
                  <div className="invalid-feedback">{formik.errors.number}</div>
                )}

<input
                  type="text"
                  id="color"
                  name="color"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.routeData.color !== ""
                      ? props.routeData.color
                      : formik.values.color
                  }
                  placeholder="color"
                  className={`form-control ${
                    formik.touched.color && formik.errors.color
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.color && formik.errors.color && (
                  <div className="invalid-feedback">{formik.errors.color}</div>
                )}

<input
                  type="text"
                  id="direction"
                  name="direction"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.routeData.direction !== ""
                      ? props.routeData.direction
                      : formik.values.direction
                  }
                  placeholder="direction"
                  className={`form-control ${
                    formik.touched.direction && formik.errors.direction
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.direction && formik.errors.direction && (
                  <div className="invalid-feedback">{formik.errors.direction}</div>
                )}

                


                <button
                  type="submit"
                  className="w-full text-center py-1 rounded bg-lime-500 text-white hover:bg-lime focus:outline-none my-1"
                  disabled={formik.isSubmitting}
                >
                  {props.routeData.buttonText}
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

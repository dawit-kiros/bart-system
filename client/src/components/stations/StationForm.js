import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";

function UserForm(props) {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      abbr: "",
      latitude: "",
      longitude: "",
      address: "",
      city: "",
      county: "",
      state: "",
      zipcode: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      abbr: Yup.string().required("abbr is required"),
      latitude: Yup.string().required("latitude is required"),
      longitude: Yup.string().required("longitude is required"),
      address: Yup.string().required("address is required"),
      city: Yup.string().required("city is required"),
      county: Yup.string().required("county is required"),
      state: Yup.string().required("state is required"),
      zipcode: Yup.string().required("zipcode is required"),
    }),
    onSubmit: async (values) => {
      setMessage("");
      setSuccessful(false);
      try {
        const response = await AuthService.register(
          values.name,
          values.abbr,          
          values.latitude,
          values.longitude,
          values.address,
          values.city,
          values.county,
          values.state,
          values.zipcode,
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
                    hidden={props.stationData.id !== "" ? false : true}
                  >
                    {" "}
                    Id:{" "}
                  </label>{" "}
                  <input
                    type="text"
                    id="_id"
                    name="_id"
                    value={
                      props.stationData.id !== ""
                        ? props.stationData.id
                        : formik.values.id
                    }
                    disabled={true}
                    hidden={props.stationData.id !== "" ? false : true}
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
                    props.stationData.name !== ""
                      ? props.stationData.name
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
                    props.stationData.abbr !== ""
                      ? props.stationData.abbr
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
                  id="latitude"
                  name="latitude"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.stationData.latitude !== ""
                      ? props.stationData.latitude
                      : formik.values.latitude
                  }
                  placeholder="latitude"
                  className={`form-control ${
                    formik.touched.latitude && formik.errors.latitude
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.latitude && formik.errors.latitude && (
                  <div className="invalid-feedback">{formik.errors.latitude}</div>
                )}

<input
                  type="text"
                  id="longitude"
                  name="longitude"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    props.stationData.longitude !== ""
                      ? props.stationData.longitude
                      : formik.values.longitude
                  }
                  placeholder="longitude"
                  className={`form-control ${
                    formik.touched.longitude && formik.errors.longitude
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.longitude && formik.errors.longitude && (
                  <div className="invalid-feedback">{formik.errors.longitude}</div>
                )}



                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  
                  placeholder="address"
                  className={`form-control ${
                    formik.touched.address && formik.errors.address
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="invalid-feedback">
                    {formik.errors.address}
                  </div>
                )}

  <input
                  type="text"
                  id="city"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                 
                  placeholder="city"
                  className={`form-control ${
                    formik.touched.city && formik.errors.city
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="invalid-feedback">
                    {formik.errors.city}
                  </div>
                )}


<input
                  type="text"
                  id="county"
                  name="county"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.county}
                 
                  placeholder="county"
                  className={`form-control ${
                    formik.touched.county && formik.errors.county
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.county && formik.errors.county && (
                  <div className="invalid-feedback">
                    {formik.errors.county}
                  </div>
                )}


<input
                  type="text"
                  id="state"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  
                  placeholder="state"
                  className={`form-control ${
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="invalid-feedback">
                    {formik.errors.state}
                  </div>
                )}


<input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zipcode}
                  
                  placeholder="zipcode"
                  className={`form-control ${
                    formik.touched.zipcode && formik.errors.zipcode
                      ? "is-invalid"
                      : "block border border-grey-light py-1  w-full p-3 rounded mb-4"
                  }`}
                />
                {formik.touched.zipcode && formik.errors.zipcode && (
                  <div className="invalid-feedback">
                    {formik.errors.zipcode}
                  </div>
                )}


                <button
                  type="submit"
                  className="w-full text-center py-1 rounded bg-lime-500 text-white hover:bg-lime focus:outline-none my-1"
                  disabled={formik.isSubmitting}
                >
                  {props.stationData.buttonText}
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

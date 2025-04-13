"use client";
import Footer from "../components/footer";
import React, { useState } from "react";
import Header from "../../components/admin-header";
import NavSettings from "../../components/admin-navigation-settings";
import { useQuery } from "@tanstack/react-query";
import { fetchGetUserInformation } from "../../../../bankapi/bankapiComponents";
import Sidebar from "../../components/sidebar";

export default function UserProfile() {
  type ApiResponse = {
    message: {
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
      isAdmin?: boolean;
    };
  };

  const { data: userInfo, status } = useQuery<ApiResponse>({
    queryKey: ["userinfo"],
    queryFn: async () => {
      const result = await fetchGetUserInformation({});
      if (!result) {
        return { message: { firstname: "", lastname: "", phone: "", email: "" } };
      }
      return result;
    },
  });

  const { message } = userInfo || {};
  const clientFirstname = message?.firstname
    ? message.firstname.charAt(0).toUpperCase() + message.firstname.slice(1)
    : "";
  const clientLastname = message?.lastname
    ? message.lastname.charAt(0).toUpperCase() + message.lastname.slice(1)
    : "";

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const successMessage = "Updated successfully!"; // Define a sample success message
  const updateUserInformation = () => {
    console.log("Updating user...");
  };

  return (
    <div>
      {status === "pending" && (
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      )}
      <div id="main-wrapper">
        <Header />
          <NavSettings firstNav={true} />
        <div id="content" className="py-4">
          <div className="container">
            <div className="row">
              <Sidebar />
              <div className="col-lg-9">
                <div className="bg-white shadow-sm rounded p-4 mb-4">
                  <h3 className="text-5 fw-400 d-flex align-items-center mb-4">User Details</h3>
                  <hr className="mx-n4 mb-4" />
                  <div className="row gx-3 align-items-center">
                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Name:</p>
                    <p className="col-sm-9 text-3">{clientFirstname + " " + clientLastname}</p>
                  </div>
                  {/*<div className="row gx-3 align-items-center">
                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Email:</p>
                    <p className="col-sm-9 text-3">{message?.email}</p>
                  </div>*/}

                  <div className="row gx-3 align-items-baseline">
                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Is Admin?:</p>
                    <p className="col-sm-9 text-3">{message?.isAdmin ? "Yes" : "No"}</p>
                  </div>

                </div>
                <div className="bg-white shadow-sm rounded p-4 mb-4">
                  <h3 className="text-5 fw-400 d-flex align-items-center mb-4">Email Address
                  {/*<a href="#edit-email" data-bs-toggle="modal" className="ms-auto text-2 text-uppercase btn-link">
                  <span className="me-1"><i className="fas fa-edit"></i></span>Edit</a>*/}
                      </h3>
                  <hr className="mx-n4 mb-4" />
                  <div className="row gx-3 align-items-center">
                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Email ID:</p>
                    <p className="col-sm-9 text-3 d-sm-inline-flex d-md-flex align-items-center">{message && message?.email}<span className="badge bg-info text-1 fw-500 rounded-pill px-2 py-1 ms-2">Primary</span></p>
                  </div>
                  </div>
                   <div className="bg-white shadow-sm rounded p-4 mb-4">
                  <h3 className="text-5 fw-400 d-flex align-items-center mb-4">Phone Number
                  {/*<a href="#edit-email" data-bs-toggle="modal" className="ms-auto text-2 text-uppercase btn-link">
                  <span className="me-1"><i className="fas fa-edit"></i></span>Edit</a>*/}
                      </h3>
                  <hr className="mx-n4 mb-4" />
                  <div className="row gx-3 align-items-center">
                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Phone:</p>
                    <p className="col-sm-9 text-3 d-sm-inline-flex d-md-flex align-items-center">{message && message?.phone}<span className="badge bg-info text-1 fw-500 rounded-pill px-2 py-1 ms-2">Primary</span></p>
                  </div>
                  </div>

                {/* Modal */}
                <div id="edit-personal-details" className="modal fade" role="dialog" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-400">Personal Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body p-4">
                        {visible && (
                          <div className="alert alert-success d-flex align-items-center justify-content-between p-2">
                            <div className="d-flex align-items-center w-100">
                              <div
                                className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                style={{ width: "30px", height: "30px" }}
                              >
                                <i className="fas fa-bullhorn"></i>
                              </div>
                              <p className="lead mb-0 flex-grow-1 text-center">{successMessage}</p>
                            </div>
                            <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
                          </div>
                        )}
                        <form id="personaldetails" method="post">
                          <div className="row g-3">
                            <div className="col-12 col-sm-6">
                              <label htmlFor="firstName" className="form-label">First Name</label>
                              <input
                                type="text"
                                value={data.firstName}
                                className="form-control"
                                id="firstName"
                                required
                                placeholder="First Name"
                                onChange={(e) => setData((val) => ({ ...val, firstName: e.target.value }))}
                              />
                            </div>
                            <div className="col-12 col-sm-6">
                              <label htmlFor="lastName" className="form-label">Last Name</label>
                              <input
                                type="text"
                                value={data.lastName}
                                className="form-control"
                                id="lastName"
                                required
                                placeholder="Last Name"
                                onChange={(e) => setData((val) => ({ ...val, lastName: e.target.value }))}
                              />
                            </div>
                          </div>

                          <h3 className="text-5 fw-400 mt-4">Address</h3>
                          <hr />
                          <div className="row g-3">
                            <div className="col-12">
                              <label htmlFor="address" className="form-label">Address</label>
                              <input
                                type="text"
                                value={data.address}
                                className="form-control"
                                id="address"
                                required
                                placeholder="Address"
                                onChange={(e) => setData((val) => ({ ...val, address: e.target.value }))}
                              />
                            </div>
                            <div className="col-12 col-sm-6">
                              <label htmlFor="city" className="form-label">City</label>
                              <input
                                id="city"
                                type="text"
                                className="form-control"
                                value={data.city}
                                required
                                placeholder="City"
                                onChange={(e) => setData((val) => ({ ...val, city: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="col-12 mt-4 d-grid">
                            <button className="btn btn-primary" type="button" onClick={updateUserInformation}>
                              Update Account
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Modal */}
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

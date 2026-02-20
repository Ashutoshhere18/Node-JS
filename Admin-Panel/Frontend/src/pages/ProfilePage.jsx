

import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_uri } from "../../utils/global-function.js";

export default function Profile() {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${base_uri}/admin/get-current-user`,
        { withCredentials: true }
      );
      if (res.data.status) {
        setCurrentUser(res.data.user);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        `${base_uri}/admin/update-user`,
        currentUser,
        { withCredentials: true }
      );
      if (res.data.status) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
  <div
    className="container-fluid p-5"
    style={{ backgroundColor: "#f5f7fb", minHeight: "100vh" }}
  >
    <h3 className="fw-bold mb-4">My Profile</h3>

    <div className="row g-4">

      {/* ===== Left Profile Card ===== */}
      <div className="col-md-4">
        <div className="card border-0 shadow-sm rounded-4 p-4 text-center profile-card">

          <div className="position-relative d-inline-block">
            <img
              src={currentUser.image || "https://i.pravatar.cc/150"}
              className="rounded-circle profile-img"
              alt="profile"
            />
          </div>

          <h5 className="mt-3 mb-1">
            {currentUser.name || "Your Name"}
          </h5>

          <p className="text-muted mb-3">
            {currentUser.role || "User"}
          </p>

          <button
            className="btn btn-primary rounded-3 w-100"
            onClick={handleUpdateProfile}
          >
            Save Changes
          </button>
        </div>
      </div>


      {/* ===== Right Details Section ===== */}
      <div className="col-md-8">
        <div className="card border-0 shadow-sm rounded-4 p-4 profile-card">

          <div className="row g-4">

            {[
              { label: "Name", field: "name", type: "text" },
              { label: "Phone", field: "phone", type: "text" },
              { label: "Age", field: "age", type: "text" },
              { label: "Education", field: "education", type: "text" },
              { label: "Experience", field: "exp", type: "text" },
            ].map((item, index) => (
              <div className="col-md-6" key={index}>
                <label className="form-label text-muted">
                  {item.label}
                </label>
                <input
                  type={item.type}
                  className="form-control rounded-3 profile-input"
                  value={currentUser[item.field] || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      [item.field]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            {/* Email (Read Only) */}
            <div className="col-md-6">
              <label className="form-label text-muted">Email</label>
              <input
                type="email"
                className="form-control rounded-3 bg-light"
                value={currentUser.email || ""}
                readOnly
              />
            </div>

            {/* Address */}
            <div className="col-md-12">
              <label className="form-label text-muted">Address</label>
              <input
                type="text"
                className="form-control rounded-3 profile-input"
                value={currentUser.address || ""}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    address: e.target.value,
                  })
                }
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
);
}

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
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-5">

      {/* ===== Header ===== */}
      <div className="mb-4">
        <h2 className="fw-bold">Profile</h2>
        <p className="text-muted">
          Manage your personal information & skills
        </p>
      </div>

      <div className="row g-4">

        {/* ===== Left Profile Card ===== */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center">

            <img
              src={currentUser.image || "https://i.pravatar.cc/150"}
              alt="profile"
              className="rounded-circle mb-3"
              width="120"
              height="120"
            />

            <h5 className="fw-bold mb-0">
              {currentUser.name || "Not Assigned"}
            </h5>

            <p className="text-muted mb-2">
              {currentUser.education || "Learner"}
            </p>

            <span className="badge bg-success mb-3">
              Active User
            </span>

            <button className="btn btn-outline-primary w-100">
              Edit Profile
            </button>
          </div>
        </div>

        {/* ===== Right Details ===== */}
        <div className="col-md-8">

          {/* ===== Personal Info ===== */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-semibold mb-3">Personal Information</h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.name || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={currentUser.email || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.phone || "Not Added"}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Age</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.age || "Not Added"}
                  readOnly
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.address || "Not Added"}
                  readOnly
                />
              </div>

            </div>
          </div>

          {/* ===== Skills Section (Static for now) ===== */}
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-semibold mb-3">Skills Progress</h5>

            <p className="mb-1">React</p>
            <div className="progress mb-3">
              <div
                className="progress-bar bg-primary"
                style={{ width: "75%" }}
              >
                75%
              </div>
            </div>

            <p className="mb-1">JavaScript</p>
            <div className="progress mb-3">
              <div
                className="progress-bar bg-success"
                style={{ width: "85%" }}
              >
                85%
              </div>
            </div>

            <p className="mb-1">CSS</p>
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                style={{ width: "70%" }}
              >
                70%
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

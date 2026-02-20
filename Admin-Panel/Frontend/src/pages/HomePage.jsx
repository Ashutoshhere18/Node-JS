
import React from "react";
import { Link } from "react-router";
import "../App.css";

export default function Dashboard() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">

        {/* ===== Sidebar ===== */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4 d-flex flex-column">
          <h4 className="fw-bold mb-4 text-center">
            <span className="text-primary">Skill</span>Panel
          </h4>

          <ul className="nav flex-column gap-2 flex-grow-1">
            <li className="nav-item">
              <Link to="/Add-employee" className="nav-link text-white sidebar-link">
                👨‍💼 Employee
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/complaint-dashboard" className="nav-link text-white sidebar-link">
                📊 Complaint Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/complaints" className="nav-link text-white sidebar-link">
                📝 Complaints
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ProfilePage" className="nav-link text-white sidebar-link">
                👤 Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/skills" className="nav-link text-white sidebar-link">
                🧠 Skills
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/AboutPage" className="nav-link text-white sidebar-link">
                ℹ️ About
              </Link>
            </li>
          </ul>

          <Link to="/" className="nav-link text-danger mt-auto">
            🚪 Logout
          </Link>
        </div>

        {/* ===== Main Content ===== */}
        <div className="col-md-9 col-lg-10 bg-light p-5">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold">Dashboard</h2>
              <p className="text-muted mb-0">Admin Overview</p>
            </div>
            <div className="fw-semibold">
              👋 Welcome, Admin
            </div>
          </div>

          {/* ===== Stats Cards ===== */}
          <div className="row g-4 mb-4">

            {[
              { title: "Total Users", value: 120 },
              { title: "Total Complaints", value: 48 },
              { title: "Open Complaints", value: 12 },
              { title: "Resolved", value: 36 },
            ].map((card, index) => (
              <div className="col-md-3" key={index}>
                <div className="card border-0 shadow-sm rounded-4 p-4 stat-card">
                  <h6 className="text-muted">{card.title}</h6>
                  <h3 className="fw-bold">{card.value}</h3>
                </div>
              </div>
            ))}

          </div>

          {/* ===== Recent Complaints Section ===== */}
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-semibold mb-3">Recent Complaints</h5>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>WiFi Not Working</td>
                  <td>IT</td>
                  <td><span className="badge bg-danger">High</span></td>
                  <td><span className="badge bg-warning text-dark">Open</span></td>
                </tr>
                <tr>
                  <td>Library AC Issue</td>
                  <td>Facility</td>
                  <td><span className="badge bg-primary">Medium</span></td>
                  <td><span className="badge bg-success">Resolved</span></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
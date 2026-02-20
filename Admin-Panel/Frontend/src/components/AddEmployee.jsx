import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { base_uri } from '../../utils/global-function.js';
import { useNavigate } from 'react-router'

export default function AddEmployee() {
   const[search,setSearch]=useState("")
  const [skip, setSkip] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [department,setDepartment]=useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers();
  }, [skip])

  const handleAddEmployee = async () => {
    try {
      const res = await axios.post(`${base_uri}/auth/signup`, { email, password }, { withCredentials: true })
      if (res.data.status) {
        alert("Employee added successfully!");
        getAllUsers();
      }
    } catch (err) {
      alert(err.message);
    }
  }
   const handleAddDepartment = async () => {
    try {
      const res = await axios.post(`${base_uri}/selection?name=${department}`);
      if (res.data.status) {
       alert(res.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${base_uri}/admin/get-users?skip=${skip}&limit=5`, { withCredentials: true });
      if (res.data.status) {
        setUsers(res.data.user)
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${base_uri}/admin/delete-user?id=${id}`, { withCredentials: true });
      if (res.data.status) {
        alert(res.data.message);
        // Refresh the employee list
        getAllUsers();
      } else {
        alert(res.data.message || "Failed to delete employee");
      }
    } catch (err) {
      alert(err.message);
    }
  }
 const handleFetchEmployeeByRole=async()=>{
    try{
      const res=axios.get(`${base_uri}/admin/get-user-by-role?role=${search}`, { withCredentials: true });
      if((await res).data.status){
        setUsers((await res).data.users);
      }
    }catch(err){
      alert(err.message);
    }
  }

return (
  <div className="container-fluid p-4" style={{ backgroundColor: "#f5f7fb", minHeight: "100vh" }}>

    {/* ===== Add Employee Card ===== */}
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <h4 className="fw-bold mb-4">Add New Employee</h4>

      <div className="row g-3">

        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control rounded-3"
            placeholder="name@example.com"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control rounded-3"
            placeholder="*******"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Department</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            type="text"
            className="form-control rounded-3"
            placeholder="HR, IT, Accountant..."
          />
        </div>

        <div className="col-md-3 d-flex align-items-end gap-2">
          <button
            onClick={handleAddEmployee}
            className="btn btn-primary rounded-3 w-100"
          >
            Add Employee
          </button>

          <button
            onClick={handleAddDepartment}
            className="btn btn-outline-primary rounded-3 w-100"
          >
            Add Dept
          </button>
        </div>

      </div>
    </div>


    {/* ===== Employee Table Card ===== */}
    <div className="card border-0 shadow-sm rounded-4 p-4">

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Employee Data</h5>

        <div className="d-flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="form-control rounded-3"
            placeholder="Search by role"
          />

          <button
            className="btn btn-primary rounded-3"
            onClick={handleFetchEmployeeByRole}
          >
            Search
          </button>

          <button
            onClick={() => {
              if (users.length === 5) setSkip(skip + 5);
              else alert("All documents shown");
            }}
            className="btn btn-outline-secondary rounded-3"
          >
            +
          </button>

          <button
            onClick={() => {
              if (skip >= 5) setSkip(skip - 5);
              else alert("Limit reached");
            }}
            className="btn btn-outline-secondary rounded-3"
          >
            -
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No Employee Available
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user?.user?.name || "Not Assigned"}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {user?.user?.role || "Not Assigned"}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => navigate("/edit-emp", { state: user })}
                      className="btn btn-sm btn-warning rounded-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-sm btn-danger rounded-3 ms-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  </div>
);
  
}

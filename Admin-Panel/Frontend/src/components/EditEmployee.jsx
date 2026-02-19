import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { base_uri } from '../../utils/global-function.js';
import { useNavigate, useLocation } from 'react-router'

export default function EditEmployee() {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state;

  useEffect(() => {
    handleGetDepartments();
  }, []);
  const [email, setEmail] = useState(employeeData?.email || "");
  const [name, setName] = useState(employeeData?.user?.name || "");
  const [role, setRole] = useState(employeeData?.user?.role || "");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(employeeData?.department || "");

  const handleGetDepartments=async()=>{
    try{
     const res=await axios.get(`${base_uri}/selection`);
     if(res.data.status){
    
      const dep = res.data.department ?? res.data.departments ?? [];
      setDepartments(Array.isArray(dep) ? dep : (dep ? [dep] : []));
     }
    }catch(err){
      alert(err.message);
    }
  }

  const handleUpdateEmployee = async () => {
    if (!email || !name || !role) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      // Update user details
      const updateUserData = {
        _id: employeeData?.user?._id,
        name,
        role
      };

      const res = await axios.put(`${base_uri}/admin/update-user`, updateUserData, { withCredentials: true });
      
      if (res.data.status) {
        alert("Employee updated successfully!");
        navigate("/Add-employee");
      } else {
        alert(res.data.message || "Failed to update employee");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/Add-employee");
  };

  return (
    <div className='container-fluid'>
      <div className='container shadow mt-4 p-4 rounded'>
        <h4 className='mb-4'>Edit Employee</h4>
        
        <div className='row'>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                value={email} 
                disabled
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="name@example.com" 
              />
              <small className="text-muted">Email cannot be changed</small>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Enter full name" 
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="form-control" 
                id="role"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
        </div>
                <div className='row'>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="form-control"
                id="department"
              >
                <option value="">Select Department</option>
                {Array.isArray(departments) && departments.map((dep) => (
                  <option
                    key={dep._id ?? dep.name}
                    value={dep.name}
                  >
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='mt-4 d-flex gap-2'>
          <button 
            onClick={handleUpdateEmployee} 
            className='btn btn-primary text-white'
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Employee'}
          </button>
          <button 
            onClick={handleCancel} 
            className='btn btn-secondary'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

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

  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers();
  }, [skip])

  const handleAddEmployee = async () => {
    try {
      const res = await axios.post(`${base_uri}/auth/signup`, { email, password })
      if (res.data.status) {
        alert("Employee added successfully!");
        getAllUsers();
      }
    } catch (err) {
      alert(err.message);
    }
  }
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${base_uri}/admin/get-users?skip=${skip}&limit=5`);
      if (res.data.status) {
        setUsers(res.data.user)
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${base_uri}/admin/delete-user?id=${id}`);
      if (res.data.status) {
        alert(res.data.message);
      }
      getAllUsers();
    } catch (err) {
      alert(err.message);
    }
  }
 const handleFetchEmployeeByRole=async()=>{
    try{
      const res=axios.get(`${base_uri}/admin/get-user-by-role?role=${search}`);
      if((await res).data.status){
        setUsers((await res).data.users);
      }
    }catch(err){
      alert(err.message);
    }
  }
  return (
//   <div className='container'>
//         <div className='shadow-lg'>
      
//     <div className="mb-3">
//     <label for="exampleInputEmail1" className="form-label">Email address</label>
//     <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>

//    <div className="mb-3">
//     <label for="exampleInputEmail1" className="form-label">Password</label>
//     <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
//     <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
//   </div>

//  <button className='btn btn-primary'> Add Employee</button>
//     </div>

//     <div className='mt-5 shadow-lg'>
//     <table class="table table-hover">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">Name</th>
//       <th scope="col">Email</th>
//       <th scope="col">Role</th>
//       <th scope="col">Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto@gmail.com</td>
//       <td>Employee</td>
//       <td>
//         <button className='btn btn-warning'>Edit</button>
//         <button className='btn btn-danger'>Delete</button>
//       </td>
//     </tr>
    
//   </tbody>
// </table>
//     </div>
   
//   </div>
<div className='container-fluid'>
      <div className='container shadow mt-4 p-4 rounded'>
        <div className='col-6 '>
          <h4 className='mb-3'>Add a new Employee</h4>
          <div className='d-flex w-100 justify-content-between'>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="*******" />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <button onClick={handleAddEmployee} className='btn btn-primary text-white mt-3 '>Add Employee</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container shadow w-100 p-3 mt-4 '>
        <div className='d-flex justify-content-between'>
          <h2>Employee Data</h2>
          <div>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='fetched employee by role' />
            <button className='btn btn-primary ms-2' onClick={handleFetchEmployeeByRole}>Search</button>

            <button onClick={()=>{if(users.length==5){setSkip(skip+5)}else{alert("all documents already shown")}}} className='ms-2 btn btn-primary'>++</button>
            <button onClick={()=>{if(skip>=5){setSkip(skip-5)}else{alert("limit reached")}}} className='btn btn-primary ms-2'>--</button>
            </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{
            users.length==0?
            <tr>
              <td></td>
              <td></td>
              <td>No Employee Available</td>
              <td></td>
              <td></td>
            </tr>
            :
            users.map((user, i) =>
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{user.user.name ? user.user.name : "Not assign"}</td>
                <td>{user.email}</td>
                <td>{user.user.role ? user.user.role : "Not assign"}</td>
                <td>
                  <button onClick={() => {
                    navigate("/edit-emp", { state: user });
                  }} className='btn btn-warning'>Edit</button>
                  <button onClick={() => handleDelete(user._id)} className='btn btn-danger ms-2'>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

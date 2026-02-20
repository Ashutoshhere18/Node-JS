import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import { base_uri } from "../../utils/global-function";

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    priority: "Low"
  });

  const fetchComplaints = async () => {
    const res = await axios.get(`${base_uri}/complaints`);
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${base_uri}/complaints`, form);
    setForm({ title: "", description: "", department: "", priority: "Low" });
    fetchComplaints();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${base_uri}/complaints/${id}`, { status });
    fetchComplaints();
  };

  const filtered = complaints.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1>Complaints</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Search */}
      <input
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Table */}
      <table style={{ width: "100%", background: "white" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c._id}>
              <td>{c.title}</td>
              <td>{c.department}</td>
              <td style={{
                color:
                  c.priority === "High"
                    ? "red"
                    : c.priority === "Medium"
                    ? "orange"
                    : "green"
              }}>
                {c.priority}
              </td>
              <td>
                <select
                  value={c.status}
                  onChange={(e) =>
                    updateStatus(c._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default ComplaintPage;
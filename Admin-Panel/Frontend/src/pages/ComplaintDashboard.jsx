import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import { base_uri } from "../../utils/global-function";

const ComplaintDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get(`${base_uri}/complaints/stats/all`)
      .then(res => setStats(res.data));
  }, []);

  const Card = ({ title, value }) => (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "200px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );

  return (
    <AdminLayout>
      <h1>Complaint Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card title="Total" value={stats.total || 0} />
        <Card title="Pending" value={stats.pending || 0} />
        <Card title="Resolved" value={stats.resolved || 0} />
        <Card title="High Priority" value={stats.high || 0} />
      </div>
    </AdminLayout>
  );
};

export default ComplaintDashboard;
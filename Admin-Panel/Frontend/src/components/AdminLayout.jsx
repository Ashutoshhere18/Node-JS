import { Link } from "react-router";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>
        <h2>Admin Panel</h2>
        <hr />
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/complaint-dashboard" style={{ color: "white" }}>Dashboard</Link>
          <Link to="/complaints" style={{ color: "white" }}>Complaints</Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "30px", background: "#f1f5f9" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
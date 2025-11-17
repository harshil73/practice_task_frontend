import { useEffect, useState } from "react";
import API from "../helper/api";

export const GetTenanats = () => {
  const [tenants, setTenants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    const getTenants = async () => {
      const { data } = await API.get("/tenant/get");
      setTenants(data?.tenant);
    };
    getTenants();
  }, []);

  function openEditPopup(user) {
    setSelectedTenant(user); // store clicked row data
    setShowPopup(true); // show popup
  }

  const handleSave = async () => {
    try {
      const { data } = await API.put(`/tenant/update`, selectedTenant);
      console.log("data: ", data);

      // After saving, update table (optional)
      setTenants((prev) =>
        prev.map((t) => (t._id === selectedTenant._id ? selectedTenant : t))
      );

      setShowPopup(false);
      alert("Tenant updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const thStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    background: "#f2f2f2",
    fontWeight: "bold",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "10px",
  };

  return (
    <>
      <h2>All Tenants here</h2>

      {tenants.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Industry</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Edit</th>
            </tr>
          </thead>

          <tbody>
            {tenants.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.industry}</td>
                <td style={tdStyle}>{user.status}</td>
                <td style={tdStyle}>
                  <button onClick={() => openEditPopup(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* POPUP */}
      {showPopup && selectedTenant && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <h3>Edit Tenant</h3>

            <input
              type="text"
              value={selectedTenant.name}
              onChange={(e) =>
                setSelectedTenant({ ...selectedTenant, name: e.target.value })
              }
            />
            <br />
            <br />

            <input
              type="text"
              value={selectedTenant.email}
              onChange={(e) =>
                setSelectedTenant({ ...selectedTenant, email: e.target.value })
              }
            />
            <br />
            <br />

            <input
              type="text"
              value={selectedTenant.industry}
              onChange={(e) =>
                setSelectedTenant({
                  ...selectedTenant,
                  industry: e.target.value,
                })
              }
            />
            <br />
            <br />

            <button onClick={() => setShowPopup(false)}>Close</button>
            <button
              type="submit"
              style={{ marginLeft: "10px" }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "5px",
  width: "300px",
};

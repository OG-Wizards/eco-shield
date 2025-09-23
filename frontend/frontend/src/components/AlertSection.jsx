// src/components/AlertSection.jsx
import React, { useState } from "react";

export default function AlertSection({ isPolicymaker = false }) {
  const [alerts, setAlerts] = useState([
    { id: 1, message: "High HMPI levels detected in Delhi. Avoid outdoor activities." },
    { id: 2, message: "Mumbai air quality is moderate. Sensitive groups take precautions." },
  ]);
  const [newAlert, setNewAlert] = useState("");

  const addAlert = () => {
    if (!newAlert.trim()) return;
    setAlerts([...alerts, { id: Date.now(), message: newAlert }]);
    setNewAlert("");
  };

  return (
    <div style={{ border: "1px solid #f44336", padding: "10px", borderRadius: "8px" }}>
      <h3 style={{ color: "#f44336" }}>⚠️ Alerts</h3>
      <ul style={{ maxHeight: "200px", overflowY: "auto", padding: "0", listStyle: "none" }}>
        {alerts.map((a) => (
          <li key={a.id} style={{ marginBottom: "8px", color: "#d32f2f" }}>
            {a.message}
          </li>
        ))}
      </ul>

      {isPolicymaker && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={newAlert}
            onChange={(e) => setNewAlert(e.target.value)}
            placeholder="Enter new alert..."
            style={{ width: "70%", padding: "5px" }}
          />
          <button onClick={addAlert} style={{ padding: "5px 10px", marginLeft: "5px" }}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}

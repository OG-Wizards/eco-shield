// frontend/src/pages/Scientist.jsx
import React, { useState, useEffect } from "react";
import { uploadCSV } from "../utils/api.js";

const ScientistDashboard = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [samples, setSamples] = useState([]);

  // Demo data for table
  const demoSamples = [
    { id: 1, city: "Delhi", latitude: 28.7041, longitude: 77.1025, hmpi: 72.5, hei_cd: 50.2, mpi: 65.3, pli: 45.6 },
    { id: 2, city: "Mumbai", latitude: 19.076, longitude: 72.8777, hmpi: 45.3, hei_cd: 30.1, mpi: 40.7, pli: 28.4 },
    { id: 3, city: "Chennai", latitude: 13.0827, longitude: 80.2707, hmpi: 25.7, hei_cd: 18.3, mpi: 22.4, pli: 15.6 },
    { id: 4, city: "Kolkata", latitude: 22.5726, longitude: 88.3639, hmpi: 55.8, hei_cd: 35.2, mpi: 48.9, pli: 30.1 },
    { id: 5, city: "Bangalore", latitude: 12.9716, longitude: 77.5946, hmpi: 32.4, hei_cd: 20.5, mpi: 25.6, pli: 18.2 },
  ];

  useEffect(() => {
    // Load demo samples
    setSamples(demoSamples);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      const res = await uploadCSV(file);
      setMessage(res.message || "CSV uploaded successfully!");
      setFile(null);
      document.getElementById("csvInput").value = null;
    } catch (err) {
      console.error("Upload error:", err);
      const msg = err.response?.data?.error || err.message;
      setMessage(`Upload failed: ${msg}`);
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (hmpi) => {
    if (hmpi < 30) return "#155724"; // Safe - green
    if (hmpi < 60) return "#856404"; // Moderate - orange
    return "#721c24"; // Unsafe - red
  };

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "900px",
      margin: "2rem auto",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        Scientist Dashboard
      </h2>
      <p style={{ textAlign: "center", color: "#555" }}>
        Upload CSV samples to update the HMPI database.
      </p>

      {/* CSV Upload Section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <input
          type="file"
          id="csvInput"
          accept=".csv"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: uploading ? "#aaa" : "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s"
          }}
        >
          {uploading ? "Uploading..." : "Upload CSV"}
        </button>

        {message && (
          <div style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            color: message.includes("failed") ? "#b00020" : "#155724",
            backgroundColor: message.includes("failed") ? "#f8d7da" : "#d4edda",
            border: message.includes("failed") ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
            textAlign: "center",
            width: "100%"
          }}>
            {message}
          </div>
        )}
      </div>

      {/* Demo Samples Table */}
      <div style={{ marginTop: "2rem", border: "1px solid #ddd", borderRadius: "8px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              {["City", "Latitude", "Longitude", "HMPI", "HEI-CD", "MPI", "PLI", "Status"].map((heading) => (
                <th
                  key={heading}
                  style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "center", color: "#555" }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {samples.map((s) => {
              const statusColor = getStatusColor(s.hmpi);
              let statusText = "Unsafe";
              if (s.hmpi < 30) statusText = "Safe";
              else if (s.hmpi < 60) statusText = "Moderate";

              return (
                <tr key={s.id} style={{ textAlign: "center" }}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.city}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.latitude.toFixed(4)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.longitude.toFixed(4)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.hmpi.toFixed(2)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.hei_cd.toFixed(2)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.mpi.toFixed(2)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.pli.toFixed(2)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee", fontWeight: "bold", color: statusColor }}>
                    {statusText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScientistDashboard;

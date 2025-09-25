// frontend/src/pages/Scientist.jsx
import React, { useState, useEffect } from "react";
import { uploadCSV } from "../utils/api.js";

const ScientistDashboard = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [samples, setSamples] = useState([]);

  // Demo data
  const demoSamples = [
    { id: 1, city: "Delhi", latitude: 28.7041, longitude: 77.1025, hmpi: 72.5, hei_cd: 50.2, mpi: 65.3, pli: 45.6 },
    { id: 2, city: "Mumbai", latitude: 19.076, longitude: 72.8777, hmpi: 45.3, hei_cd: 30.1, mpi: 40.7, pli: 28.4 },
    { id: 3, city: "Chennai", latitude: 13.0827, longitude: 80.2707, hmpi: 25.7, hei_cd: 18.3, mpi: 22.4, pli: 15.6 },
    { id: 4, city: "Kolkata", latitude: 22.5726, longitude: 88.3639, hmpi: 55.8, hei_cd: 35.2, mpi: 48.9, pli: 30.1 },
    { id: 5, city: "Bangalore", latitude: 12.9716, longitude: 77.5946, hmpi: 32.4, hei_cd: 20.5, mpi: 25.6, pli: 18.2 },
  ];

  useEffect(() => {
    setSamples(demoSamples);
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a CSV file.");
      return;
    }
    try {
      setUploading(true);
      setMessage("");
      const res = await uploadCSV(file);
      setMessage(res.message || "✅ CSV uploaded successfully!");
      setFile(null);
      document.getElementById("csvInput").value = null;
    } catch (err) {
      console.error("Upload error:", err);
      const msg = err.response?.data?.error || err.message;
      setMessage(`❌ Upload failed: ${msg}`);
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadge = (hmpi) => {
    if (hmpi < 30) return { text: "Safe", bg: "#d4edda", color: "#155724" };
    if (hmpi < 60) return { text: "Moderate", bg: "#fff3cd", color: "#856404" };
    return { text: "Unsafe", bg: "#f8d7da", color: "#721c24" };
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1000px",
        margin: "2rem auto",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem", color: "#333" }}>
        Scientist Dashboard
      </h2>
      <p style={{ textAlign: "center", marginBottom: "2rem", color: "#666" }}>
        Upload water quality samples (CSV) and monitor contamination levels.
      </p>

      {/* Upload Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="file"
          id="csvInput"
          accept=".csv"
          onChange={handleFileChange}
          disabled={uploading}
          style={{
            padding: "0.7rem",
            borderRadius: "6px",
            border: "1px dashed #aaa",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            cursor: uploading ? "not-allowed" : "pointer",
            backgroundColor: "#fafafa",
          }}
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            padding: "0.8rem 2rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: uploading ? "#aaa" : "#28a745",
            color: "#fff",
            fontWeight: "bold",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "0.3s",
          }}
        >
          {uploading ? "Uploading..." : "Upload CSV"}
        </button>
        {message && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              fontWeight: "500",
              color: message.startsWith("❌") ? "#721c24" : "#155724",
              backgroundColor: message.startsWith("❌") ? "#f8d7da" : "#d4edda",
              border: message.startsWith("❌") ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
            }}
          >
            {message}
          </div>
        )}
      </div>

      {/* Samples Table */}
      <div
        style={{
          overflowX: "auto",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              {["City", "Latitude", "Longitude", "HMPI", "HEI-CD", "MPI", "PLI", "Status"].map(
                (heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      color: "#444",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {samples.map((s, i) => {
              const badge = getStatusBadge(s.hmpi);
              return (
                <tr
                  key={s.id}
                  style={{
                    textAlign: "center",
                    backgroundColor: i % 2 === 0 ? "#fff" : "#fdfdfd",
                  }}
                >
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{s.city}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {s.latitude.toFixed(4)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {s.longitude.toFixed(4)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {s.hmpi.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {s.hei_cd.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {s.mpi.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {s.pli.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        backgroundColor: badge.bg,
                        color: badge.color,
                      }}
                    >
                      {badge.text}
                    </span>
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

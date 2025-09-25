// frontend/src/pages/Researcher.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BackButton from "../components/BackButton"; // ✅ Import Back Button

export default function ResearcherDashboard() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo data
  const demoSamples = [
    { id: 1, city: "Delhi", latitude: 28.7041, longitude: 77.1025, metrics: { hmpi: 72.5, hei_cd: 50.2, mpi: 65.3, pli: 45.6 } },
    { id: 2, city: "Mumbai", latitude: 19.076, longitude: 72.8777, metrics: { hmpi: 45.3, hei_cd: 30.1, mpi: 40.7, pli: 28.4 } },
    { id: 3, city: "Chennai", latitude: 13.0827, longitude: 80.2707, metrics: { hmpi: 25.7, hei_cd: 18.3, mpi: 22.4, pli: 15.6 } },
    { id: 4, city: "Kolkata", latitude: 22.5726, longitude: 88.3639, metrics: { hmpi: 55.8, hei_cd: 35.2, mpi: 48.9, pli: 30.1 } },
    { id: 5, city: "Bangalore", latitude: 12.9716, longitude: 77.5946, metrics: { hmpi: 32.4, hei_cd: 20.5, mpi: 25.6, pli: 18.2 } },
  ];

  useEffect(() => {
    // Simulate fetching demo data
    setTimeout(() => {
      setSamples(demoSamples);
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;

  // Prepare chart data
  const chartData = samples.map((s) => ({
    city: s.city,
    HMPI: Number(s.metrics?.hmpi || 0),
    HEICD: Number(s.metrics?.hei_cd || 0),
    MPI: Number(s.metrics?.mpi || 0),
    PLI: Number(s.metrics?.pli || 0),
  }));

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* ✅ Back to Home */}
      <BackButton />

      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        Researcher Dashboard
      </h2>

      {/* Table */}
      <div
        style={{
          overflowX: "auto",
          marginBottom: "2rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              {["City", "Latitude", "Longitude", "HMPI", "HEI-CD", "MPI", "PLI"].map(
                (heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ccc",
                      textAlign: "center",
                      color: "#555",
                    }}
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {samples.map((s) => (
              <tr key={s.id} style={{ textAlign: "center" }}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.city}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {parseFloat(s.latitude || 0).toFixed(4)}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {parseFloat(s.longitude || 0).toFixed(4)}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {parseFloat(s.metrics?.hmpi || 0).toFixed(2)}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {parseFloat(s.metrics?.hei_cd || 0).toFixed(2)}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {parseFloat(s.metrics?.mpi || 0).toFixed(2)}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {parseFloat(s.metrics?.pli || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Separate Charts */}
      <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        Metrics Comparison Charts
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* HMPI Chart */}
        <div style={{ height: "300px" }}>
          <h4 style={{ textAlign: "center", marginBottom: "0.5rem" }}>HMPI</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="HMPI" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* HEI-CD Chart */}
        <div style={{ height: "300px" }}>
          <h4 style={{ textAlign: "center", marginBottom: "0.5rem" }}>HEI-CD</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="HEICD" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* MPI Chart */}
        <div style={{ height: "300px" }}>
          <h4 style={{ textAlign: "center", marginBottom: "0.5rem" }}>MPI</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="MPI" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PLI Chart */}
        <div style={{ height: "300px" }}>
          <h4 style={{ textAlign: "center", marginBottom: "0.5rem" }}>PLI</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="PLI" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

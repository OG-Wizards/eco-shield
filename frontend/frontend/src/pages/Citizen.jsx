// frontend/src/pages/Citizen.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";

// Demo sample data
const demoSamples = [
  { id: 1, city: "Delhi", latitude: 28.7041, longitude: 77.1025, hmpi: 72.5 },
  { id: 2, city: "Mumbai", latitude: 19.076, longitude: 72.8777, hmpi: 45.3 },
  { id: 3, city: "Chennai", latitude: 13.0827, longitude: 80.2707, hmpi: 25.7 },
  { id: 4, city: "Kolkata", latitude: 22.5726, longitude: 88.3639, hmpi: 55.8 },
  { id: 5, city: "Bangalore", latitude: 12.9716, longitude: 77.5946, hmpi: 32.4 },
];

// Floating Chatbot + Alert component
function FloatingChatbot({ alerts }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    const aiResponse = `You asked: "${input}". I can provide sample info only.`;
    setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {open && (
          <div
            style={{
              width: "300px",
              height: "400px",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              marginBottom: "10px",
            }}
          >
            <div style={{ background: "#2196F3", color: "#fff", padding: "8px", fontWeight: "bold" }}>
              AI Chatbot
            </div>
            <div style={{ flex: 1, padding: "5px", overflowY: "auto" }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "3px 0" }}>
                  <strong>{msg.sender === "user" ? "You: " : "AI: "}</strong> {msg.text}
                </div>
              ))}
            </div>
            <div style={{ padding: "5px", borderTop: "1px solid #ccc", display: "flex" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <button onClick={handleSend} style={{ marginLeft: "5px", padding: "5px 10px" }}>Send</button>
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          💬
        </button>
      </div>

      {/* Alerts Section */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "90px",
          zIndex: 999,
          width: "250px",
          background: "#fff3cd",
          border: "1px solid #ffeeba",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        }}
      >
        <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>Alerts</h4>
        <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "14px" }}>
          {alerts.map((alert, idx) => (
            <li key={idx}>{alert}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function CitizenDashboard() {
  const [samples, setSamples] = useState([]);
  const alerts = [
    "Heavy pollution in Delhi!",
    "Water contamination reported in Mumbai",
    "Monsoon flood alert in Chennai",
  ];

  useEffect(() => {
    // Load demo samples
    setSamples(demoSamples);
  }, []);

  const getColor = (hmpi) => {
    if (hmpi < 30) return "green";
    if (hmpi < 60) return "orange";
    return "red";
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Citizen Dashboard</h2>

      {/* Summary */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        {["Safe", "Moderate", "Unsafe"].map((label, i) => (
          <div key={i} style={{
            flex: 1,
            margin: "0 10px",
            padding: "15px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}>
            <h4 style={{ margin: "0 0 10px 0", color: label==="Safe"?"green":label==="Moderate"?"orange":"red" }}>
              {label} Cities
            </h4>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
              {samples.filter(s => label==="Safe"?s.hmpi<30:label==="Moderate"?s.hmpi<60 && s.hmpi>=30:s.hmpi>=60).length}
            </p>
          </div>
        ))}
      </div>

      {/* Map */}
      <MapContainer center={[20, 78]} zoom={5} style={{ height: "500px", width: "100%", marginBottom: "20px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {samples.map((s) => (
          <Circle
            key={s.id}
            center={[s.latitude, s.longitude]}
            radius={50000}
            pathOptions={{ color: getColor(s.hmpi), fillColor: getColor(s.hmpi), fillOpacity: 0.4 }}
          />
        ))}
      </MapContainer>

      {/* Table */}
      <h3 style={{ marginBottom: "10px" }}>HMPI Status by City</h3>
      <div style={{ overflowX: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              {["City", "HMPI", "Status"].map((h) => <th key={h} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {samples.map((s) => (
              <tr key={s.id} style={{ textAlign: "center" }}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.city}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{s.hmpi.toFixed(2)}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee", color: getColor(s.hmpi), fontWeight: "bold" }}>
                  {s.hmpi<30?"Safe":s.hmpi<60?"Moderate":"Unsafe"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Chatbot & Alerts */}
      <FloatingChatbot alerts={alerts} />
    </div>
  );
}

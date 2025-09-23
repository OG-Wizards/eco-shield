// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CitizenDashboard from "./pages/Citizen";
import PolicymakerDashboard from "./pages/Policymaker";
import ScientistDashboard from "./pages/Scientist";
import ResearcherDashboard from "./pages/Researcher";
import Chatbot from "./components/Chatbot";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/policymaker" element={<PolicymakerDashboard />} />
        <Route path="/scientist" element={<ScientistDashboard />} />
        <Route path="/researcher" element={<ResearcherDashboard />} />
      </Routes>

  );
}

export default App;

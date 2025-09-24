// src/pages/Home.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const dashboards = [
    { name: "Citizen", path: "/citizen" },
    { name: "Policymaker", path: "/policymaker" },
    { name: "Scientist", path: "/scientist" },
    { name: "Researcher", path: "/researcher" },
  ];

    const features = [
    { 
      title: "AI Chatbot", 
      description: "Get instant insights with our intelligent AI assistant." 
    },
    { 
      title: "Heatmap", 
      description: "Visualize key trends and hotspots easily." 
    },
    { 
      title: "Analysis", 
      description: "Advanced data analytics for research and policymaking." 
    },
    { 
      title: "Easy to Use", 
      description: "Intuitive interface for quick access to dashboards." 
    },
    { 
      title: "Charts of Results", 
      description: "Visualize pollution index and other results with easy-to-read charts." 
    },
    { 
      title: "AI Forecasting", 
      description: "Predict future pollution trends with powerful AI-based forecasting models." 
    },
    { 
      title: "Health Impact Estimator", 
      description: "Estimate potential health risks caused by contaminated water in your region." 
    },
    { 
      title: "Spatial Interpolation", 
      description: "Fill in missing data points and map hidden patterns using geospatial AI methods." 
    },
  ];

  // Particle network effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 2 + Math.random() * 3;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 35 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.move();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        fontFamily: "Arial, sans-serif",
        paddingBottom: "100px",
        color: "#0d1b2a",
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Header */}
      <h1
        style={{
          fontSize: "3rem",
          marginTop: "50px",
          marginBottom: "40px",
          color: "#0d1b2a",
          textShadow: "0 0 8px rgba(0,0,0,0.2)",
          zIndex: 1,
          position: "relative",
        }}
      >
        HMPI Tracker
      </h1>

      {/* Dashboard buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center",
          zIndex: 1,
          position: "relative",
          marginBottom: "60px",
        }}
      >
        {dashboards.map((dash) => (
          <button
            key={dash.name}
            onClick={() => navigate(dash.path)}
            style={{
              padding: "30px 50px",
              fontSize: "1.5rem",
              borderRadius: "20px",
              border: "2px solid #0d1b2a",
              cursor: "pointer",
              background: "linear-gradient(135deg, #ffffffaa, #ffffff33)",
              color: "#0d1b2a",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-7px)";
              e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
              e.target.style.background = "linear-gradient(135deg, #ffffffcc, #ffffff55)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
              e.target.style.background = "linear-gradient(135deg, #ffffffaa, #ffffff33)";
            }}
          >
            {dash.name}
          </button>
        ))}
      </div>

      {/* Features Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          zIndex: 1,
          position: "relative",
          marginBottom: "60px",
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              padding: "25px",
              borderRadius: "20px",
              minWidth: "220px",
              maxWidth: "260px",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{ fontSize: "1.3rem", marginBottom: "10px", color: "#0d1b2a" }}>{feature.title}</h3>
            <p style={{ fontSize: "1rem", color: "#0d1b2a" }}>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* About Us Section */}
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "50px 30px",
          maxWidth: "1000px",
          zIndex: 1,
          position: "relative",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#0d1b2a" }}>About Us</h2>
        <p style={{ fontSize: "1.1rem", color: "#0d1b2a" }}>
          We make analysis of HMPI <strong>easy</strong>, helping citizens understand pollution levels,
          researchers study effectively, and policymakers take timely actions.  
          Our platform leverages <strong>AI</strong> and an <strong>easy-to-use interface</strong> to simplify complex data.
        </p>
      </div>
    </div>
  );
}

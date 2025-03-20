import React, { useState } from "react";
import "@fontsource/inter";
import "./App.css";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        setEmail("");
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="logo"><span className="green">Eco</span>Search</h1>
      <h2 className="main-heading">World’s first <span className="green">Green</span> AI</h2>

      <div className="waitlist-section">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Join the waitlist</button>
        </form>
      </div>

      {showPopup && <div className="popup">Thank you for joining the waitlist!</div>}

      <h1 className="sustainable-heading">Build sustainable systems with your search</h1>

      <div className="features-grid">
        <Feature icon="🌳" title="Climate Driven" description="We put the revenue earned to work with climate investments." />
        <Feature icon="🍃" title="Optimized Search" description="We provide quality search results, reducing energy consumption." />
        <Feature icon="🔒" title="Privacy First" description="We don’t collect or store any data." />
        <Feature icon="♻️" title="Minimal Design" description="Our design system is minimal to reduce carbon footprints." />
      </div>

      <footer className="footer">
        <h2>EcoSearch</h2>
        <p>© 2025 EcoSearch</p>
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="feature">
    <div className="icon">{icon}</div>
    <h2 className="feature-title">{title}</h2>
    <p className="feature-description">{description}</p>
  </div>
);

export default HomePage;

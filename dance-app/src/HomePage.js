import React from 'react';
import './homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="logo">
          kham<span className="dot">.</span>
        </div>
        <input className="search" type="text" placeholder="Search dancers, styles, trends..." />
        <div className="nav-buttons">
          <button className="btn create-btn">Create Video</button>
          <button className="btn login-btn">Login</button>
          <button className="notif-btn">🔔</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="title">kham</h1>
        <p className="subtitle">An app for dancers, by dancers</p>
        <div className="main-buttons">
          <button className="btn gradient-btn">Start Creating Now</button>
          <button className="btn join-btn">Join the Community →</button>
        </div>
        <p className="scroll-text">Scroll to explore</p>
      </main>

      {/* Footer Bar */}
      <footer className="footer">
        <div className="footer-tab"> Discover</div>
        <div className="footer-tab">Community</div>
        <div className="footer-tab">Create</div>
        <div className="footer-tab">Profile</div>
      </footer>
    </div>
  );
};

export default HomePage;

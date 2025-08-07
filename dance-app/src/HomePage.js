import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="homepage gradient-background">
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="logo black-text">
          8count<span className="dot">.</span>
        </div>
        <input className="search" type="text" placeholder="Search dancers, styles, trends..." />
        <div className="nav-buttons">
          <button className="btn create-btn">Create Video</button>
          <button className="btn login-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="notif-btn">🔔</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="title black-text">kham</h1>
        <p className="subtitle">An app for dancers, by dancers</p>
        <div className="main-buttons">
          <button className="btn gradient-btn pulse" onClick={() => navigate('/signup')}>Start Creating Now</button>
          <button className="btn join-btn" onClick={() => navigate('/signup')}>Join the Community →</button>
        </div>
        <p className="scroll-text">Scroll to explore</p>
      </main>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-block fade-up" style={{ marginTop: '4rem' }}>
          <h2>Jumpstart your career!</h2>
          <p>Whether you’re a beginner or a pro, kham connects you with worSkshops, battles, and gigs in your city.</p>
        </div>
        <div className="info-block fade-up">
          <h2>There’s a dancer in everyone!</h2>
          <p>From freestylers to classical artists—find your rhythm, share your story, and grow with a like-minded crew.</p>
        </div>
        <div className="info-block fade-up">
          <h2>Meet the Team</h2>
          <p>We’re dancers, creators, and coders building a space we always wished existed—by dancers, for dancers.</p>
        </div>
        <div className="info-block fade-up general-section">
          <h2 className="general-heading">Want to explore more?</h2>
          <p className="general-text">We’ve built a space for every style and story. Look through this and explore it all.</p>
          <button className="general-btn pulse">General</button>
        </div>
      </section>

      {/* Explore Styles */}
         <section className="explore-section" style={{ marginTop: '-1rem' }}>
        <h2 className="explore-title">Explore Styles</h2>

        <div className="style-grid-container">
          <div className="style-grid">
            {[
              'Hip-Hop', 'Contemporary', 'Ballet',
              'Jazz', 'Breaking', 'Popping',
              'Heels', 'Waacking', 'Ballroom'
            ].map((style, idx) => (
              <div className="style-card shimmer" key={idx}>{style}</div>
            ))}
          </div>

          {!expanded && (
            <div className="see-all-overlay" onClick={() => setExpanded(true)}>
              <p className="see-all-text">See All ⌄</p>
            </div>
          )}
        </div>

        {expanded && (
          <>
            <div className="expanded-grid">
              {[
                'Salsa', 'K-Pop', 'Tutting', 'Krump',
                'Kathak', 'Bharatanatyam', 'Tango', 'Tap'
              ].map((style, idx) => (
                <div className="style-card shimmer" key={`extra-${idx}`}>{style}</div>
              ))}
            </div>

            <button className="collapse-btn" onClick={() => setExpanded(false)}>
              Collapse All ▲
            </button>
          </>
        )}
      </section>

      {/* Shine Section */}
      <section className="shine-section">
        <div className="shine-card">
          <h3 className="shine-title gradient-text">Ready to shine?</h3>
          <p className="shine-subtext">Join thousands of dancers sharing their passion</p>
          <div className="shine-buttons">
            <button className="btn upload-btn pulse">
              📹 Upload Your Dance <span className="arrow">→</span>
            </button>
            <button className="btn join-btn-light">
              👥 Join Community
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-tab">Discover</div>
        <div className="footer-tab">Community</div>
        <div className="footer-tab" onClick={() => navigate('/signup')}>Create</div>
        <div className="footer-tab" onClick={() => navigate('/profile')}>Profile</div>
      </footer>
    </div>
  );
};

export default HomePage;

import React, { useEffect } from 'react';
import './homepage.css';

const HomePage = () => {
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


      {/* NEW INFO SECTION */}
      <section className="info-section">
        <div className="info-block fade-up">
          <h2>Jumpstart your career!</h2>
          <p>Whether you’re a beginner or a pro, kham connects you with workshops, battles, and gigs in your city.</p>
        </div>

        <div className="info-block fade-up">
          <h2>There’s a dancer in everyone!</h2>
          <p>From freestylers to classical artists—find your rhythm, share your story, and grow with a like-minded crew.</p>
        </div>

        <div className="info-block fade-up">
          <h2>Meet the Team</h2>
          <p>We’re dancers, creators, and coders building a space we always wished existed—by dancers, for dancers.</p>
        </div>
        <div className="info-block fade-up center-button">
          <button className="general-btn">General</button>
        </div>
  
        
      </section>
      

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

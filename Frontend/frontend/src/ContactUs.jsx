import React from 'react';

export default function ContactUs() {
  return (
    <div className="contact-container">
      {/* Title Bar */}
      <div className="title-bar">
        <h1>Connect With Me</h1>
        <p>You can find me on LinkedIn.</p>
      </div>

      {/* LinkedIn Link */}
      <div className="link-container">
        <a 
          href="https://www.linkedin.com/in/k-jithendhar-reddy-696474260" // <-- TODO: REPLACE WITH YOUR LINKEDIN URL
          className="linkedin-link"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="linkedin-icon"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>

      {/* CSS Styles */}
      <style>{`
        .contact-container {
          min-height: 100vh;
          width: 100%;
          background-color: black;
          color: white;
          padding: 20px;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .title-bar {
          background: linear-gradient(90deg, blue, purple, pink);
          padding: 20px;
          text-align: center;
          border-radius: 10px;
          margin-bottom: 40px;
        }

        .title-bar h1 {
          margin: 0;
          font-size: 3rem;
        }

        .title-bar p {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: 500;
        }

        .link-container {
          text-align: center;
          margin-top: 60px;
        }

        .linkedin-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background-color: #0077B5; /* LinkedIn Blue */
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          text-decoration: none;
          transition: transform 0.2s ease-in-out, background-color 0.2s;
        }
        
        .linkedin-link:hover {
          transform: scale(1.05);
          background-color: #005E90;
        }

        .linkedin-icon {
          width: 24px;
          height: 24px;
          fill: white;
        }
          /* In src/index.css */

html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000000; /* Sets the default background to black */
  font-family: system-ui, sans-serif;
}
      `}</style>
    </div>
  );
}
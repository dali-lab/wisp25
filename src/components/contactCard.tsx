import React from 'react';
import './contactCard.css';

interface ContactCardProps {
  onBack: () => void;
  name: string;
}

const contactCard: React.FC<ContactCardProps> = ({ onBack }) => {
  return (
    <div className="student-detail-container">
      <h1 className="title">Coffee Chat Connection</h1>

      <div className="student-card-wrapper">
        <div className="student-header">
          <span className="student-label">Student #1</span>
        </div>

        <div className="student-content">
          <div className="info-section">
            <h2 className="info-title">Academic Background</h2>
            <div className="info-box">
              I am currently studying math with a potential minor in International Relations. On campus, I am a tour guide and involved with the writing center.
            </div>
          </div>

          <div className="info-section">
            <h2 className="info-title">Contact Info</h2>
            <div className="info-box">
              student.28@dartmouth.edu<br />
              LinkedIn: student-2028
            </div>
          </div>
        </div>
      </div>

      <button className="back-button"
        onClick={onBack}>
        Back to Connections
      </button>
    </div>
  );
};

export default contactCard;
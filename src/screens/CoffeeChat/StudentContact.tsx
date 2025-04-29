import React from 'react';
import './contactCard.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ContactCard: React.FC = ({ }) => {
  const location = useLocation();
  const { name, studentId } = location.state || {};

  return (
    <div className="student-detail-container">
      <h1 className="page-title">Coffee Chat Connection</h1>

      <div className="student-header">
        <span className="student-label">{name}</span>
      </div>
      <div className="student-card-wrapper">
        <div className="student-content">
          <div className="info-section">
            <h2 className="info-title">Academic Interest</h2>
            <div className="info-box">
              I am currently studying math with a potential minor in International Relations. On campus, I am a tour guide and involved with the writing center.
            </div>
          </div>

          <div className="info-section">
            <h2 className="info-title">Contact Info {studentId} </h2>
            <div className="info-box">
              <p>student.28@dartmouth.edu</p>
              <p>LinkedIn: student-2028</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentContact: React.FC = ({ }) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('explorecoffeechat');
  };

  return (
    <div>
      <ContactCard />
      <div>
        <button className="back-button"
          onClick={handleBackClick}>
            Back to Connections
        </button>
      </div>
    </div>
  );
};

export default StudentContact;
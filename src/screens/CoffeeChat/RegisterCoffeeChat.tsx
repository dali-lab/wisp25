import React, { useState } from 'react';
import './RegisterCoffeeChat.css';
import '../../assets/menu_icon.svg';

const RegisterCoffeeChat = () => {
  const [page, setPage] = useState(1);

  const handleNext = () => {
    setPage(page + 1);
  };
  
  const handleBack = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <div className="container">
        <nav className="nav">
          
        </nav>
        <div>
          <h1 className="page-title-title"> Coffee Chat Connection </h1>
        </div>
        {page === 1 && (
          <div className="first-page">
            <div className="section-header"> Contact Info </div>

            <form onSubmit={handleNext}>
              <div className="form-group">
                <label className="form-label"> Name </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label"> Email Address </label>
                <input
                  type="email"
                  placeholder="Enter here"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label"> LinkedIn </label>
                <input
                  type="url"
                  placeholder="(Optional) Enter here"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label"> Message </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="form-input"
                />
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  className="submit-button">
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        
        {page === 2 && (
          <div className="page-two">
            <div className="section-header"> Academic Info </div>
        
            <form onSubmit={handleNext}>
            <div className="form-group">
                <label className="form-label"> Grad Year </label>
                <input
                  type="number"
                  placeholder="Enter here"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label"> Major </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label"> Minor </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="form-input"
                />
              </div>
        
              <div className="form-group">
                <label className="form-label"> Academic Interest </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  className="form-input"
                />
              </div>
        
              <div className="form-group">
                <label className="form-label"> Courses Taken </label>
                <input
                  type="text"
                  placeholder="(Optional) Enter here"
                  className="form-input"
                />
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  className="submit-button">
                        Submit
                </button>
                <button
                  type="button"
                  className="back"
                  onClick={handleBack}>
                        Back
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegisterCoffeeChat;
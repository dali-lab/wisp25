import React, { useState } from 'react';
import MenuBar from './MenuBar';
import './LandingPage.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };
  return (
    <div className="container">
      <nav className="navbar">
        <div className="hamburger" onClick={handleMenuToggle}>
          <MenuRoundedIcon sx={{ fontSize: 30 }} />
        </div>
        <h1 className="title">Big Green Planner</h1>
        <div className="savedCourses">
          <a href="#">
            <BookmarkBorderRoundedIcon fontSize="large" />
          </a>
        </div>
      </nav>
      <MenuBar isOpen={menuOpen} />
      <div className="body">
        <h2>
          Find Your Courses. <br /> Build Your Schedule. <br /> Meet Your
          People.
        </h2>
        <p>
          Explore courses, plan your schedule, and connect with students who've
          been there.
        </p>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search for course, subject, or professor"
          />
          <div className="searchIcon">
            <SearchRoundedIcon sx={{ fontSize: 30 }} />
          </div>
        </div>
        <div className="highlights">
          <div className="highlight">
            <a href="#">
              <MenuBookRoundedIcon sx={{ fontSize: 90 }} />
              <h3>Subjects</h3>
            </a>
          </div>
          <div className="highlight">
            <a href="#">
              <PeopleOutlineRoundedIcon sx={{ fontSize: 90 }} />
              <h3>Coffee Chats</h3>
            </a>
          </div>
          <div className="highlight">
            <a href="#">
              <StarRoundedIcon sx={{ fontSize: 90 }} />
              <h3>Reviews</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

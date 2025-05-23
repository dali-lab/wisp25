import React, { useState } from "react";
import MenuBar from "../../components/MenuBar/MenuBar";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { Link } from "react-router-dom";
import './LandingPage.css'

const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
          <Link to="/savedCourses">
            <BookmarkBorderRoundedIcon fontSize="large" />
          </Link>
        </div>
      </nav>
      {/* Pass the isOpen prop here */}
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
            <Link to="/courseSearch">
              <MenuBookRoundedIcon sx={{ fontSize: 90 }} />
              <h3>Courses</h3>
            </Link>
          </div>
          <div className="highlight">
            <Link to="/coffeeChat">
              <PeopleOutlineRoundedIcon sx={{ fontSize: 90 }} />
              <h3>Coffee Chats</h3>
            </Link>
          </div>
          <div className="highlight">
            <Link to="/courseLoadTester">
              <StarRoundedIcon sx={{ fontSize: 90 }} />
              <h3>Course Load Tester</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

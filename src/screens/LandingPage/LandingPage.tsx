import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuBar from "../../components/MenuBar/MenuBar";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { Link, useNavigate } from "react-router-dom";
import './LandingPage.css'

interface Course {
  id: string;
  subject_id: string;
  course_number: string;
  name: string;
  // add more fields if needed
}

const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="landing-container">
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
      <MenuBar isOpen={menuOpen} />
      <div className="landing-body">
        <h2>
          Find Your Courses. <br /> Build Your Schedule. <br /> Meet Your
          People.
        </h2>
        <p>
          Explore courses, plan your schedule, and connect with students who've
          been there.
        </p>
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
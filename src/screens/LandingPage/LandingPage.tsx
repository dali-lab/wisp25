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

  // Fetch all courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        let page = 1;
        let fetchedCourses: Course[] = [];
        let hasMore = true;

        while (hasMore) {
          const response = await axios.get('/api/academic/courses', {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AUTH_FOR_COURSES}`
            },
            params: {
              is_active: true,
              pagesize: 500,
              page,
            }
          });
          const courses: Course[] = response.data;
          if (courses.length > 0) {
            fetchedCourses = [...fetchedCourses, ...courses];
            page++;
          } else {
            hasMore = false;
          }
        }
        setAllCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCourses([]);
      return;
    }

    const lower = searchTerm.toLowerCase();
    const filtered = allCourses.filter(course =>
      course.name.toLowerCase().includes(lower) ||
      course.subject_id.toLowerCase().includes(lower) ||
      course.course_number.toLowerCase().includes(lower)
    ).slice(0, 10); // limit results for performance/readability

    setFilteredCourses(filtered);
  }, [searchTerm, allCourses]);

  // Handle selecting a course (navigate to details page)
  const handleSelectCourse = (id: string) => {
    setSearchTerm("");           // Clear the search box
    setFilteredCourses([]);      // Clear results
    navigate(`/courseDetails/${id}`); // Adjust route according to your app
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
        <div className="searchBar" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search for course, subject, or professor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          <div className="searchIcon">
            <SearchRoundedIcon sx={{ fontSize: 30 }} />
          </div>

          {/* Dropdown showing filtered courses */}
          {filteredCourses.length > 0 && (
            <ul className="search-results-dropdown" style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "300px",
              overflowY: "auto",
              backgroundColor: "white",
              border: "1px solid #ddd",
              zIndex: 1000,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}>
              {filteredCourses.map(course => (
                <li
                  key={course.id}
                  onClick={() => handleSelectCourse(course.id)}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                  }}
                >
                  {course.subject_id} {course.course_number} - {course.name}
                </li>
              ))}
            </ul>
          )}

          {loading && <p style={{ marginTop: 5 }}>Loading courses...</p>}
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
import React from "react";
import "./MenuBar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

interface MenuBarProps {
  isOpen: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ isOpen }) => {
  return (
    <div className={`menuBar ${isOpen ? "open" : "closed"}`}>
      <ul className="menuItems">
        <li className="menuItem">
          <Link to="/courseSearch">
            <SearchRoundedIcon sx={{ fontSize: 35 }} />
            <p>Search Courses</p>
          </Link>
        </li>
        <li className="menuItem">
          <Link to="/courseLoadTester">
            <MenuBookRoundedIcon sx={{ fontSize: 35 }} />
            <p>Course Load Tester</p>
          </Link>
        </li>
        <li className="menuItem">
          <Link to="/savedCourses">
            <BookmarkBorderRoundedIcon sx={{ fontSize: 35 }} />
            <p>Saved Courses</p>
          </Link>
        </li>
        <li className="menuItem">
          <Link to="/coffeeChat">
            <PeopleOutlineRoundedIcon sx={{ fontSize: 35 }} />
            <p>Coffee Chat</p>
          </Link>
        </li>
        <li className="menuItem">
          <Link to="/register">
            <PersonIcon sx={{ fontSize: 35 }} />
            <p>Register for Coffee Chats</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;

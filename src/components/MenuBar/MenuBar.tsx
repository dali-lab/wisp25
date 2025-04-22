import React from "react";
import "./MenuBar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import PersonIcon from "@mui/icons-material/Person";

interface MenuBarProps {
  isOpen: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ isOpen }) => {
  return (
    <div className={`menuBar ${isOpen ? "open" : "closed"}`}>
      <ul className="menuItems">
        <li className="menuItem">
          <a href="#">
            <SearchRoundedIcon sx={{ fontSize: 35 }} />
            <p>Search Courses</p>
          </a>
        </li>
        <li className="menuItem">
          <a href="#">
            <MenuBookRoundedIcon sx={{ fontSize: 35 }} />
            <p>Course Load Tester</p>
          </a>
        </li>
        <li className="menuItem">
          <a href="#">
            <BookmarkBorderRoundedIcon sx={{ fontSize: 35 }} />
            <p>Saved Courses</p>
          </a>
        </li>
        <li className="menuItem">
          <a href="#">
            <PeopleOutlineRoundedIcon sx={{ fontSize: 35 }} />
            <p>Coffee Chat</p>
          </a>
        </li>
        <li className="menuItem">
          <a href="#">
            <PersonIcon sx={{ fontSize: 35 }} />
            <p>Register for Coffee Chats</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
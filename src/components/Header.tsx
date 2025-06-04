import React, { useState } from "react";
import "../components/Header.css";
import TileIcon from '../assets/tile-icon.svg';
import ListIcon from '../assets/list-icon.svg';
import MenuBar from "../components/MenuBar/MenuBar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { Link } from "react-router-dom";


interface HeaderProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleMenuToggle = () => {
      setMenuOpen((prevState) => !prevState);
    };
  
  return (
    <header className="header">
      <div className="hamburger" onClick={handleMenuToggle}>
          <MenuRoundedIcon sx={{ fontSize: 30 }} />
        </div>
      <MenuBar isOpen={menuOpen} />
      <h1 className="header-title">Saved Courses</h1>
      {/* <div className="view-toggle">
        <button
          className="button-style-t"
          onClick={() => setViewMode("grid")}
          disabled={viewMode === "grid"}
        >
          <div>
            <img
              src={TileIcon}
              alt=""
              height={20}
              style={{ marginRight: 10 }}
            />
            tiles
          </div>
        </button>
        <button
          className="button-style-g"
          onClick={() => setViewMode("list")}
          disabled={viewMode === "list"}
        >
          <img
            src={ListIcon}
            alt=""
            height={20}
            style={{ marginRight: 10 }}
          />
          list
        </button>
      </div> */}
    </header>
  );
};

export default Header;

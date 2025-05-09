import React from "react";
import "../components/Header.css";
import TileIcon from '../assets/tile-icon.svg';
import ListIcon from '../assets/list-icon.svg';

interface HeaderProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode }) => {
  return (
    <header className="header">
      <button>-</button>
      <h1 className="header-title">Saved Courses</h1>
      <div className="view-toggle">
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
      </div>
    </header>
  );
};

export default Header;

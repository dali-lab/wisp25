import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "../screens/LandingPage/LandingPage";
import CourseSearch from "../screens/CourseSearch";
import SavedCourses from "../screens/SavedCourses";
import CourseLoadTester from "../screens/CourseLoadTester";
import CoffeeChat from "../screens/CoffeeChat/CoffeeChat";
import ExploreCoffeeChat from "../screens/CoffeeChat/ExploreCoffeeChat";
import RegisterCoffeeChat from "../screens/CoffeeChat/RegisterCoffeeChat";
import RegisterPlaceholder from "../screens/CoffeeChat/RegisterPlaceholder";
import StudentContact from "../screens/CoffeeChat/StudentContact";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Landing Page</Link>
            </li>
            <li>
              <Link to="/courseSearch">Course Search</Link>
            </li>
            <li>
              <Link to="/savedCourses">Saved Courses</Link>
            </li>
            <li>
              <Link to="/courseloadtester">Course Load Tester</Link>
            </li>
            <li>
              <Link to="/coffeechat">Coffee Chat</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courseSearch" element={<CourseSearch />} />
          <Route path="/savedCourses" element={<SavedCourses />} />
          <Route path="/courseloadtester" element={<CourseLoadTester />} />
          <Route path="coffeechat" element={<CoffeeChat />}>
          <Route path="registercoffeechat" element={<RegisterCoffeeChat />} />
          <Route path="explorecoffeechat" element={<ExploreCoffeeChat />} />
          <Route path="registercoffeechattest" element={< RegisterPlaceholder/>} />
          </Route>
          <Route path="/contact" element={<StudentContact />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;

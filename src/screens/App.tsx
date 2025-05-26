import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "../screens/LandingPage/LandingPage";
import CourseSearch from "./CourseSearch/CourseSearch";
import CourseLoadTester from "./CourseLoadTester/CourseLoadTester";
import CoffeeChat from "../screens/CoffeeChat/CoffeeChat";
import ExploreCoffeeChat from "../screens/CoffeeChat/ExploreCoffeeChat";
import RegisterCoffeeChat from "../screens/CoffeeChat/RegisterCoffeeChat";
import StudentContact from "../screens/CoffeeChat/StudentContact";

//test

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courseSearch" element={<CourseSearch />} />
          {/* <Route path="/savedCourses" element={<SavedCourses />} /> */}
          <Route path="/courseLoadTester" element={<CourseLoadTester />} />
          <Route path="/coffeeChat" element={<CoffeeChat />}>
          <Route path="/coffeeChat/register" element={<RegisterCoffeeChat />} />
          <Route path="/coffeeChat/explore" element={<ExploreCoffeeChat />} />
          {/* <Route path="/registerCoffeeChatTest" element={< RegisterPlaceholder/>} /> */}
          </Route>
          <Route path="/contact" element={<StudentContact />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;

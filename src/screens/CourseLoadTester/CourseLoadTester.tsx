import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './CourseLoadTester.css';



const CourseLoadTester = () => {
  const [cards, setCards] = useState([
    { id: 1, content: 'course1' },
  ]);
  
  return (
    <div className="page-page">
      <h1 className="page-name"> Course Load Tester </h1>
      <div className="main-container">
        <div className="course-container">
          <h2 className="tester-container"> Saved Courses </h2>
          {cards.map((card) => (
            <Draggable key={card.id} bounds="parent">
              <div className="card-card">
                {card.content}
              </div>
            </Draggable>
          ))}
        </div>
        <div className="tester-contianer">
          <h2 className="container-label"> Test Course Load </h2>
        </div>
      </div>
    </div>
  );
};

export default CourseLoadTester;
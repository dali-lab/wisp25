import React, { useState, useEffect } from "react";
import {
  isCourseSaved,
  saveCourse,
  removeCourse,
} from "../utils/courseStorage";
import "./CourseModal.css";
import SaveIcon from '../assets/save-icon.svg';
import CloseIcon from '../assets/close-icon.svg';
import  {Course}  from "../screens/CourseSearch";

type CourseDetailModalProps = {
  course: Course;
  onClose: () => void;
  onUnsave: (courseId: string) => void;
};

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onUnsave,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isCourseSaved(course.id));
  }, [course]);

  const handleToggleSave = () => {
    if (isSaved) {
      removeCourse(course.id);
      onUnsave(course.id);
    } else{
      saveCourse(course);
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="Course-Header-Rectangle">
          {course.name}
          <img
            src={CloseIcon}
            alt=""
            className="figma-icon1"
            onClick={onClose}
          />
        </div>
        <div className="Course-Info-Rectangle">
          <div className="courseinfoboxes">
            <div>
              <div className="infobox-title">Instructor</div>
              <div className="infobox-content">{course.instructor}</div>
            </div>
            <div>
              <div className="infobox-title">Time</div>
              <div className="infobox-content">{course.time}</div>
            </div>
            <div>
              <div className="infobox-title">Credits</div>
              <div className="infobox-content">{course.credits}</div>
            </div>
            <div>
              <div className="infobox-title">NRO</div>
              <div className="infobox-content">{course.nro}</div>
            </div>
            <div>
              <div className="infobox-title">CRN</div>
              <div className="infobox-content">{course.crn}</div>
            </div>
            <div>
              <div className="infobox-title">Pre Req</div>
              <div className="infobox-content">{course.prereqs}</div>
            </div>
            <div>{course.description}</div>
          </div>
          <div className="crosslisted">Crosslisted: {course.crossListed}</div>
          <img
            src={SaveIcon}
            onClick={handleToggleSave}
            className="save-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;

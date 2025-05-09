import React, { useState, useEffect } from "react";
import {
  isCourseSaved,
  saveCourse,
  removeCourse,
} from "../utils/courseStorage";
import "./CourseModal.css";
import SaveIcon from '../assets/save-icon.svg';
import CloseIcon from '../assets/close-icon.svg';

type CourseDetailModalProps = {
  course: any;
  onClose: () => void;
};

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isCourseSaved(course.id));
  }, [course]);

  const handleToggleSave = () => {
    if (isSaved) {
      removeCourse(course.id);
    } else {
      saveCourse(course);
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="Course-Header-Rectangle">
          {course.title}
          <img
            src={CloseIcon}
            alt=""
            className="figma-icon1"
            onClick={onClose}
          />
        </div>
        <div className="Course-Info-Rectangle">
          <div className="prereqs">Prerequisite: {course.prereqs}</div>
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
          ></img>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;

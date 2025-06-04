import React, { useState, useEffect } from "react";
import {
  isCourseSaved,
  saveCourse,
  removeCourse,
} from "../../utils/courseStorage";
import "./CourseModal.css";
import SaveIcon from '../../assets/save-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import  {Section}  from "../CourseSearch/CourseSearch";

type CourseDetailModalProps = {
  course: Section;
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
        <div className="Course-Header-Rectangle-Saved">
          {course.name}
          <img
            src={CloseIcon}
            alt=""
            className="figma-icon1-saved"
            onClick={onClose}
          />
        </div>
        <div className="Course-Info-Rectangle-Saved">
          <div className="courseinfoboxes-saved">
            <div>
              <div className="infobox-title-saved">Instructor</div>
              <div className="infobox-content-saved">{course?.instructor ?? 'None'}</div>
            </div>
            <div>
              <div className="infobox-title-saved">Time</div>
              <div className="infobox-content-saved">{course?.time ?? 'None'}</div>
            </div>
            <div>
              <div className="infobox-title-saved">Credits</div>
              <div className="infobox-content-saved">{course?.credits ?? 'None'}</div>
            </div>
            <div>
              <div className="infobox-title-saved">NRO</div>
              <div className="infobox-content-saved">{course?.nro ?? 'None'}</div>
            </div>
            <div>
              <div className="infobox-title-saved">CRN</div>
              <div className="infobox-content-saved">{course?.crn ?? 'None'}</div>
            </div>
            <div>
              <div className="infobox-title-saved">Pre Req</div>
              <div className="infobox-content-saved">{course?.prereqs ?? 'None'}</div>
            </div>
            <div>{course.description}</div>
          </div>
          <div className="crosslisted-saved">Crosslisted: {course.crosslist?.sections?.map(s => s.id).join(', ') || 'None'}</div>
          <img
            src={SaveIcon}
            onClick={handleToggleSave}
            className="save-btn-saved"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;

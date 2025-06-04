import React from "react";
import "./List.css";

export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  prereqs: string;
  crossListed: string;
  time: string;
  credits: string;
  nro?: string;
  crn: string;
  subject_id: string;
}

interface ListProps {
  viewMode: "grid" | "list";
  onSelectCourse: (course: Course) => void;
  courses: Course[];
}

const List: React.FC<ListProps> = ({ viewMode, onSelectCourse, courses=[] }) => {
  return (
    <div className={`course-list-saved ${viewMode}`}>
      {courses.map((course) => (
        <button
          key={course.id}
          className="course-card course-list-item"
          onClick={() => onSelectCourse(course)}
        >
          {course.name}
        </button>
      ))}
    </div>
  );
};

export default List;

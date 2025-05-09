import React, { useState } from "react";
import Header from "../../components/Header";
import { getSavedCourses, removeCourse } from "@/utils/courseStorage";
import CourseDetailModal from "../../components/CourseModal";
import "../SavedCourses/SavedCourses";
import { Course } from "./List";

const SavedCourses: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [savedCourses, setSavedCourses] = useState<any[]>(getSavedCourses());

  const handleRemoveCourse = (courseId: string) => {
    removeCourse(courseId);
    setSavedCourses(getSavedCourses());
};
  return (
    <div className="background-color">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      <div className="content-scrollable">
        {savedCourses.map(course => (
                    <div key={course.id} className="saved-course-card">
                        <h1 onClick={() => setSelectedCourse(course)}>{course.name}</h1>
                        <button onClick={() => handleRemoveCourse(course.id)}>Remove</button>
                    </div>
                ))}
            </div>
            {selectedCourse && (
                <CourseDetailModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            )}
        </div>
    );

};

export default SavedCourses;

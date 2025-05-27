import React, { useState } from "react";
import Header from "../../components/Header";
import { getSavedCourses, removeCourse } from "@/utils/courseStorage";
import CourseDetailModal from "../../components/CourseModal";
import "../SavedCourses/SavedCourses";
import List from "./List";
import  {Course}  from "../CourseSearch"

const SavedCourses: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedCourse, setSelectedCourse] = useState<Course | any>(null);
  const [savedCourses, setSavedCourses] = useState<Course[]>(getSavedCourses());


//   const handleRemoveCourse = (courseId: string) => {
//     removeCourse(courseId);
//     setSavedCourses(getSavedCourses());
// };
  return (
    <div className="background-color">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      <div className="content-scrollable">
      <List
        viewMode={viewMode}
        courses={savedCourses}
        onSelectCourse={(course) => setSelectedCourse(course)}
      />
        {/* {savedCourses.map(course => (
          <button
                key={course.id}
                >{course.name}
                </button>
                ))} */}
            </div>
            {selectedCourse && (
                <CourseDetailModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                    onUnsave={(courseId) => {
                      removeCourse(courseId);
                      setSavedCourses((prev) => prev.filter((c) => c.id !== courseId));
                      setSelectedCourse(null);
                    }}
                />
            )}
        </div>
    );

};

export default SavedCourses;

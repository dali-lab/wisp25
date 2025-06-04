import React, { useState } from "react";
import Header from "../../components/Header";
import { getSavedCourses, removeCourse } from "@/utils/courseStorage";
import CourseDetailModal from "./CourseModal";
import "../SavedCourses/SavedCourses";
import List from "./List";
import  {Section}  from "../CourseSearch/CourseSearch"
import "./SavedCourses.css"

const SavedCourses: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedCourse, setSelectedCourse] = useState<Section | any>(null);
  const [savedCourses, setSavedCourses] = useState<Section[]>(getSavedCourses());

  return (
    <div className="background-color-saved">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      <div className="content-scrollable">
      <List
        viewMode={viewMode}
        courses={savedCourses}
        onSelectCourse={(course) => setSelectedCourse(course)}
      />
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

export const getSavedCourses = () => {
    const saved = localStorage.getItem("savedCourses");
    return saved ? JSON.parse(saved) : [];
  };
  
  export const isCourseSaved = (courseId: string) => {
    const saved = getSavedCourses();
    return saved.some((course: any) => course.id === courseId);
  };
  
  export const saveCourse = (course: any) => {
    const saved = getSavedCourses();
    if (!isCourseSaved(course.id)){
      const updated = [...saved, course];
      localStorage.setItem("savedCourses", JSON.stringify(updated));
    }
  };
  
  export const removeCourse = (courseId: string) => {
    const saved = getSavedCourses();
    const updated = saved.filter((course: any) => course.id !== courseId);
    localStorage.setItem("savedCourses", JSON.stringify(updated));
  };
  